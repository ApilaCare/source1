(function ()
{
    'use strict';

    angular
        .module('app.core')
        .provider('msApi', msApiProvider);

    /** @ngInject **/
    function msApiProvider()
    {
        /* ----------------- */
        /* Provider          */
        /* ----------------- */
        var provider = this;

        // Inject required services
        var $log = angular.injector(['ng']).get('$log'),
            $resource = angular.injector(['ngResource']).get('$resource');

        // Data
        var baseUrl = '';
        var api = [];

        // Methods
        provider.setBaseUrl = setBaseUrl;
        provider.getBaseUrl = getBaseUrl;
        provider.getApiObject = getApiObject;
        provider.register = register;

        //////////

        /**
         * Set base url for API endpoints
         *
         * @param url {string}
         */
        function setBaseUrl(url)
        {
            baseUrl = url;
        }

        /**
         * Return the base url
         *
         * @returns {string}
         */
        function getBaseUrl()
        {
            return baseUrl;
        }

        /**
         * Return the api object
         *
         * @returns {object}
         */
        function getApiObject()
        {
            return api;
        }

        /**
         * Register API endpoint
         *
         * @param key
         * @param resource
         */
        function register(key, resource)
        {
            if ( !angular.isString(key) )
            {
                $log.error('"path" must be a string (eg. `dashboard.project`)');
                return;
            }

            if ( !angular.isArray(resource) )
            {
                $log.error('"resource" must be an array and it must follow $resource definition');
                return;
            }

            // Prepare the resource object
            var resourceObj = {
                url          : baseUrl + (resource[0] || ''),
                paramDefaults: resource[1] || [],
                actions      : resource[2] || [],
                options      : resource[3] || {}
            };

            // Assign the resource
            api[key] = $resource(resourceObj.url, resourceObj.paramDefaults, resourceObj.actions, resourceObj.options);
        }

        /* ----------------- */
        /* Service           */
        /* ----------------- */
        this.$get = function ($q, $log)
        {
            // Data

            // Methods
            var service = {
                setBaseUrl: setBaseUrl,
                getBaseUrl: getBaseUrl,
                register  : register,
                resolve   : resolve,
                request   : request
            };

            return service;

            //////////

            /**
             * Resolve an API endpoint
             *
             * @param action {string}
             * @param parameters {object}
             * @returns {promise|boolean}
             */
            function resolve(action, parameters)
            {
                var actionParts = action.split('@'),
                    resource = actionParts[0],
                    method = actionParts[1],
                    params = parameters || {};

                if ( !resource || !method )
                {
                    $log.error('msApi.resolve requires correct action parameter (resourceName@methodName)');
                    return false;
                }

                // Create a new deferred object
                var deferred = $q.defer();

                // Get the correct resource definition from api object
                var apiObject = api[resource];

                if ( !apiObject )
                {
                    $log.error('Resource "' + resource + '" is not defined in the api service!');
                    deferred.reject('Resource "' + resource + '" is not defined in the api service!');
                }
                else
                {
                    apiObject[method](params,

                        // Success
                        function (response)
                        {
                            deferred.resolve(response);
                        },

                        // Error
                        function (response)
                        {
                            deferred.reject(response);
                        }
                    );
                }

                // Return the promise
                return deferred.promise;
            }

            /**
             * Make a request to an API endpoint
             *
             * @param action {string}
             * @param [parameters] {object}
             * @param [success] {function}
             * @param [error] {function}
             *
             * @returns {promise|boolean}
             */
            function request(action, parameters, success, error)
            {
                var actionParts = action.split('@'),
                    resource = actionParts[0],
                    method = actionParts[1],
                    params = parameters || {};

                if ( !resource || !method )
                {
                    $log.error('msApi.resolve requires correct action parameter (resourceName@methodName)');
                    return false;
                }

                // Create a new deferred object
                var deferred = $q.defer();

                // Get the correct resource definition from api object
                var apiObject = api[resource];

                if ( !apiObject )
                {
                    $log.error('Resource "' + resource + '" is not defined in the api service!');
                    deferred.reject('Resource "' + resource + '" is not defined in the api service!');
                }
                else
                {
                    apiObject[method](params,

                        // SUCCESS
                        function (response)
                        {
                            // Resolve the promise
                            deferred.resolve(response);

                            // Call the success function if there is one
                            if ( angular.isDefined(success) && angular.isFunction(success) )
                            {
                                success(response);
                            }
                        },

                        // ERROR
                        function (response)
                        {
                            // Reject the promise
                            deferred.reject(response);

                            // Call the error function if there is one
                            if ( angular.isDefined(error) && angular.isFunction(error) )
                            {
                                error(response);
                            }
                        }
                    );
                }

                // Return the promise
                return deferred.promise;
            }
        };
    }
})();