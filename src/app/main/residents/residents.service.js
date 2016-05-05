(function() {

  angular.module('app.residents')
         .service('residentsService', residentsService);

  /** @ngInject */
  function residentsService(apilaData)
  {
    var residentList = null;


    var getResidentsList = function() {

      if(residentList === null) {
        var promise = apilaData.residentsList()
          .success(function(d) {
            console.log(d);
            residentList = d;
            return d;
          })
          .error(function(d) {
            console.log("Error retriving the list of residents");
          });

          return promise;
      } else {
        return residentList;
      }

    }

    return {
      getResidentsList: getResidentsList
    }


  }

})();
