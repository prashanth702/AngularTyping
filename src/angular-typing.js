// angular-typing
//
// Version: 0.1.2
// Website: http://www.codehard.in/jquery-typing/
// License: public domain <http://unlicense.org/>
// Author:  Prasanth <@prashanth702>
// Original version is here: https://github.com/narfdotpl/jquery-typing

'use strict';
// module 'angular-typing' 
angular.module('angular-typing', []).directive("typing",['$timeout',function($timeout){
	// directive 'typing'
	return {
		//allow only attributes and class
		restrict: 'AC',
		scope: {
			typeDelay:'=',
			typeStart:'&',
			typeEnd:'&'
		},
		link: function(scope, elem, attr) {
			
					// other variables
					var start = scope.typeStart, 
						stop = scope.typeEnd, 					
						input = elem[0], // input element
						typing = false, 
						timeout;

					// typing started
					function started(event) {
						if(!typing)
						{
							// set flag to true..
							typing = true;
							if(start){
								// call typeStart method on the scope
								start({ value: { input: input.value, event: event } });								
							}					
						}						
					}

					// typing ended
					function stopped(event, d) {						
						if(typing || (event.type === "paste" || event.type === "cut"))
						{
							// clear and create until typing stopped
							$timeout.cancel(timeout);

							// timeout callback
							timeout = $timeout(function() {

								// finished typing...
								typing = false;		
								if(stop) {
									// call typeEnd method on the scope									
									stop({ value: { input: input.value, event: event } });																	
								}					
							}		
							//check and assign defaults						
							, d ? d : scope.typeDelay ? scope.typeDelay : 400);
						}
					}

					//event listeners
					input.addEventListener("keypress", started);
					input.addEventListener("keyup", stopped);

					// delete and backspace
					input.addEventListener("keydown", function(event) {
						if (event.keyCode === 8 || event.keyCode === 46) {
							started(event);
						}
					});

					// blurs
					input.addEventListener("blur", function(event) {
						stopped(event, 0);
					});

					// handling paste events
					input.addEventListener("paste", function(event) {	
						stopped(event, 400);
					});

					// handling cut events
					input.addEventListener("cut", function(event) {						 
						stopped(event, 200);
					});
				}
			};
		}]);