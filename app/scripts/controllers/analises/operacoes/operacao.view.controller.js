'use strict';

angular.module('wbaApp')

  .controller('AnalisesOperacoesViewController',[
    '$scope',
    '$rootScope',
    '$state',
    '$stateParams',
    'apiAnalizes',
    'apiCustomers',
    'apiPolicies',
    'toaster',
    'Session',
    function ($scope, $rootScope, $state, $stateParams, apiAnalizes, apiCustomers, apiPolicies, toaster, Session) {

        $scope.isLoading = true;
        $scope.user = Session.getUser();

        $scope.getAnalise = function (id) {
            apiAnalizes.getAnalizeById(id).then(
                function (res) {
                    $scope.analysis = res.data;
                    $scope.loadAnswer($scope.analysis);
                    console.log($scope.analysis);
                    $scope.isLoading = false;
                },
                function (err) {
                    toaster.pop('error','Análises',err.statusText);
                }
            )
        };
        $scope.getAnalise($stateParams.analiseId);

        $scope.currentAnalysis = function() {
            return $scope.analysis;
        };

        $scope.userCanReview = function() {
            return $scope.user.permissions.customerReview;
        };
        
        $scope.analysisCanReview = function() {
            var analysis = $scope.currentAnalysis();
            if (!angular.isUndefined(analysis)) {
                return !analysis.notificaCoaf && !analysis.inProgress && analysis.review;
            } else {
                return false;
            }
        }
        
        $scope.isReview = function() {
            return $scope.userCanReview() && $scope.analysisCanReview();
        };
        
        $scope.showReviewButton = function() {
            var analysis = $scope.currentAnalysis();
            if (!angular.isUndefined(analysis))
                return $scope.userCanReview() && analysis.status != 'IN_PROGRESS' && !analysis.review;
            else
                return false;
        };
        
        $scope.review = function() {
            $scope.currentAnalysis().review=true;
            $scope.currentAnalysis().status='IN_PROGRESS';
        }

        $scope.hideNotificationButton = function () {
            if (!angular.isUndefined($scope.analysis)) {
                return !$scope.user.permissions.customerGenerateNotification ||
                $scope.analysis.lowRisk      ||
                $scope.analysis.mediumRisk   ||
                $scope.analysis.highRisk     ||
                $scope.analysis.inProgress   ||
                $scope.analysis.notSuspicion ||
                $scope.analysis.notificaCoaf;
            } else {
                return true;
            }
        };

        $scope.loadAnswer = function(analysis) {
            angular.forEach(analysis.answers, function (answer) {
                angular.forEach(analysis.policy.questions, function (question) {
                    if (answer.question.id == question.id) {
                        angular.forEach(answer.choices, function (choice) {
                            angular.forEach(question.choices, function (c) {
                                if (choice.id == c.id) {
                                    question.selectedChoice = c.id;
                                }
                            });
                        });
                    }
                });
            });
        };
        $scope.finish = function (analysis) {
            // var hashKey = $scope.analyzes[$scope.currentIndex].$$hashKey;
            var numberOfQuestions = $scope.analysis.policy.questions.length;
            var numberOfAnswers = $scope.analysis.answers.length;

            if (numberOfQuestions == numberOfAnswers) {
                apiAnalizes.execute($scope.analysis.id, $scope.analysis).then(
                    function (res) {
                        $scope.analysis = res.data;
                        $scope.loadAnswer($scope.analysis);
                        toaster.pop('success','Análise Cedentes','Análise finalizada com sucesso!');
                    },
                    function(error) {
                        toaster.pop('error','Análise Cedentes',error.status + ": " + error.message);
                    }
                );
                
            } 
            else {
                toaster.pop('error','Análise Cedentes',"Você respondeu apenas " + numberOfAnswers + " de " + numberOfQuestions + " por favor complete a analise.");
            }

        };

        $scope.save = function () {
            apiAnalizes.update($scope.analysis.id, $scope.analysis).then(
                function (res) {
                    toaster.pop('success','Análise Cedentes','Análise salva com sucesso');
                },
                function (err) {
                    toaster.pop('error','Análise Cedentes',err.status+': '+err.message);
                }
            )
        }
    }
    
    //   $scope.currentIndex = 0;
    //   $scope.type = 'C';
    //   $scope.review = $routeParams.review;
    //   $scope.analysisId = $stateParams.analiseId;
    //   $scope.status = $routeParams.status;
    //   $scope.inputCpfCnpjFilter = $routeParams.cpfCnpj;
    //   $scope.inputNomeFilter = $routeParams.nome;
    //   $scope.inputNumeroOperacaoFilter = $routeParams.numero;
    //   $scope.startDate = new Date(new Number($routeParams.startDate));
    //   $scope.endDate = new Date(new Number($routeParams.endDate));

    //   $scope.showLoading = true;
    //   $scope.analysisNotLoaded = true;

    //   $scope.firstQuery = true;

    //   $scope.openModal = function () {
    //     var analysis = $scope.currentAnalysis();
    //     var dialog = $dialog.dialog({modalFade:false, resolve:{item:angular.copy(analysis), type:angular.copy($scope.type)}});
    //     dialog.open('/app/dialogs/notification.html', 'NotificationModalCtrl').then(function (result) {
    //       if (result == 'ok') {
    //         $scope.analysis.notificaCoaf=true;
    //       }
    //     });
    //   };

    //   $scope.findAnalysis = function(items) {
    //     for (var i=0; i<items.length;i++) {
    //       if (items[i].id == $scope.analysisId) {
    //         return i;
    //       }
    //     }
    //   };

    //   // inclui o atributo "active" com o valor "false" para o(s) iten(s)
    //   $scope.addActive = function(item) {
    //     if (angular.isArray(item)) {
    //       angular.forEach(item, function(i) {
    //         $scope.addActive(i);
    //       });
    //     } else {
    //       angular.extend(item, {active:false});
    //     }
    //   };

    

    //   $scope.analysis={};

    //   $scope.getAnalysisById = function(id,fnFinish) {
    //     if (id) {
    //       Analysis.get({analysisId:id}, function(success) {
    //         $scope.analysis = success;
    //         if (fnFinish)
    //           fnFinish();
    //       });
    //     }
    //   }

    //   $scope.getAnalysisById($scope.analysisId,function() {
    //     $scope.analysisNotLoaded = false;
    //     $scope.loadAnswer($scope.currentAnalysis());
    //   });

    //   $scope.analyzes = Analysis.query(
    //     {
    //       type:$scope.type,
    //       status:$scope.status,
    //       startDate:dateUtil.formatDate($scope.startDate),
    //       endDate:dateUtil.formatDate($scope.endDate),
    //       inputCpfCnpjFilter: $scope.inputCpfCnpjFilter,
    //       inputNomeFilter: $scope.inputNomeFilter,
    //       inputNumeroOperacaoFilter: $scope.inputNumeroOperacaoFilter,
    //       deep: false
    //     },
    //     function(success) {
    //       $scope.addActive(success);
    //       $scope.currentIndex = $scope.findAnalysis(success);
    //       if ($scope.firstQuery) {
    //         $scope.firstQuery = false;
    //         $scope.showLoading = false;
    //       } 
    //       else {
    //         $scope.getAnalysisById(success[$scope.currentIndex].id,function() {
    //           $scope.loadAnswer($scope.currentAnalysis());
    //           $scope.showLoading = false;
    //         });
    //       }
    //       $scope.currentAnalysis().active = true;
    //       $scope.currentAnalysis().review = false;
    //     }
    //   );

    //   $scope.selectedOptions = '';
    //   $scope.editAnalysisValue = false;

    //   $scope.hideNotificationButton = function () {
    //     if (!angular.isUndefined($scope.analysis)) {
    //       return !$scope.permission.customerGenerateNotification ||
    //       $scope.analysis.lowRisk      ||
    //       $scope.analysis.mediumRisk   ||
    //       $scope.analysis.highRisk     ||
    //       $scope.analysis.inProgress   ||
    //       $scope.analysis.notSuspicion ||
    //       $scope.analysis.notificaCoaf;
    //     } else {
    //       return true;
    //     }
    //   }

    //   $scope.userCanReview = function() {
    //     return $scope.permission.customerReview;
    //   };

    //   $scope.analysisCanReview = function() {
    //     var analysis = $scope.currentAnalysis();
    //     if (!angular.isUndefined(analysis)) {
    //       return !analysis.notificaCoaf && !analysis.inProgress && analysis.review;
    //     } else {
    //       return false;
    //     }
    //   }

    //   $scope.isReview = function() {
    //     return $scope.userCanReview() && $scope.analysisCanReview();
    //   };

    //   $scope.showReviewButton = function() {
    //     var analysis = $scope.currentAnalysis();
    //     if (!angular.isUndefined(analysis))
    //       return $scope.userCanReview() && analysis.status != 'IN_PROGRESS' && !analysis.review;
    //     else
    //       return false;
    //   };

    //   $scope.review = function() {
    //     $scope.currentAnalysis().review=true;
    //     $scope.currentAnalysis().status='IN_PROGRESS';
    //   }

    //   $scope.loadAnswer = function(analysis) {
    //     angular.forEach(analysis.answers, function (answer) {
    //       angular.forEach(analysis.policy.questions, function (question) {
    //         if (answer.question.id == question.id) {
    //           angular.forEach(answer.choices, function (choice) {
    //             angular.forEach(question.choices, function (c) {
    //               if (choice.id == c.id) {
    //                 question.selectedChoice = c.id;
    //               }
    //             });
    //           });
    //         }
    //       });
    //     });
    //   };

    //   $scope.findChoice = function(choiceId, question) {
    //     var result = {};
    //     angular.forEach(question.choices, function(choice) {
    //       if (choice.id == choiceId) {
    //         result = choice;
    //       }
    //     });
    //     return result;
    //   };

    //   $scope.addAnswer = function (choiceId, question) {
    //     var choice = $scope.findChoice(choiceId, question);

    //     var exists = false;

    //     angular.forEach($scope.currentAnalysis().answers, function (answer) {
    //       if (answer.question.id == question.id) {
    //         exists = true;
    //         answer.choices = [];
    //         answer.choices.push(choice);
    //       }
    //     }
    //     );

    //     if (!exists) {
    //       var answer = {id:null, question:null, choices:[]}
    //       answer.question = question;
    //       answer.choices.push(choice);
    //       $scope.currentAnalysis().answers.push(answer);
    //     }
    //   }

    //   $scope.save = function (analysis) {
    //     Analysis.save({analysisId:$routeParams.analysisId}, $scope.currentAnalysis(), function (response) {
    //       alertService.addSuccessMsg('Análise salva com sucesso!');
    //     });
    //   }

    //   $scope.finish = function (analysis) {
    //   //      var hashKey = $scope.analyzes[$scope.currentIndex].$$hashKey;
    //     var numberOfQuestions = $scope.currentAnalysis().policy.questions.length;
    //     var numberOfAnswers = $scope.currentAnalysis().answers.length;

    //     if (numberOfQuestions == numberOfAnswers) {
    //       Analysis.execute({analysisId:$scope.currentAnalysis().id, operation:'doFinish'}, $scope.currentAnalysis(), function (response) {
    //     //              response.$$hashKey = hashKey; 
    //     response.active = true;
    //     $scope.loadAnswer(response);
    //     $scope.analyzes[$scope.currentIndex] = response;
    //     $scope.analysis = response;
    //     alertService.addSuccessMsg('Análise finalizada com sucesso!');
    //   }, function(error) {
    //     alertService.add(error.status,error.message);
    //   });
    //     } else {
    //       alertService.add("error", "Você respondeu apenas " + numberOfAnswers + " de "
    //         + numberOfQuestions + " por favor complete a analise.");
    //     }

    //   }

    //   $scope.cancel = function () {
    //     $location.url('/analyzes?type=' + $scope.type);
    //   }

    //   $scope.nextAnalysis = function() {
    //     $scope.showLoading=true;
    //     $scope.analysisNotLoaded=true;
    //     $scope.currentIndex = ($scope.currentIndex + 1) % $scope.analyzes.length;
    //     $scope.getAnalysisById($scope.analyzes[$scope.currentIndex].id, function() {
    //       $scope.loadAnswer($scope.currentAnalysis());
    //     });
    //     $scope.next(function() {
    //       $scope.showLoading=false;
    //       $scope.analysisNotLoaded=false;
    //     });
    //   };

    //   $scope.previousAnalysis = function() {
    //     $scope.showLoading=true;
    //     $scope.analysisNotLoaded=true;
    //     $scope.currentIndex = $scope.currentIndex -1 < 0 ? $scope.analyzes.length -1 : $scope.currentIndex-1;
    //     $scope.getAnalysisById($scope.analyzes[$scope.currentIndex].id, function() {
    //       $scope.loadAnswer($scope.currentAnalysis());
    //     });
    //     $scope.prev(function() {
    //       $scope.showLoading=false;
    //       $scope.analysisNotLoaded=false;
    //     });
    //   };

    //   $scope.print = function() {
    //     var printContents = $('#print-analysis-'+$scope.currentAnalysis().id).html();
    //     printContents=printContents.replace(/(<\/?a ?.*>|<\/?button.*>)/g,'');
    //     var w=window.open();
    //     w.document.write(printContents);
    //     w.print();
    //     w.close();
    //   };
            
    //   $scope.currentAnalysis = function() {
    //     return $scope.analysis;
    //   };
    // }
        
  ]);