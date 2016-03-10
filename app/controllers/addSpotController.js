/**
 * Created by Aashish on 3/2/2016.
 */
(function(){

    var app = angular.module('app');


    /**
     * Service to upload File
     */
    /*app.service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function(file, uploadUrl){
            var fd = new FormData();
            fd.append('file', file);
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
                .success(function(){
                })
                .error(function(){
                });
        }
    }]);*/

    app.service('fileUpload',function(Upload, $scope, $rootScope){
         this.uploadFileToServer = function(file){
             file.upload = Upload.upload({
                 url: "https://api.cloudinary.com/v1_1/" + 'travelindia' + "/upload",
                 data: {
                     upload_preset: "oayw5ldd",
                     tags: 'myphotoalbum',
                     context: 'photo=' + title,
                     file: file
                 }
             }).progress(function (e) {
                 //$scope.imgData[key].progress = Math.round((e.loaded * 100.0) / e.total);
                 //file.status = "Uploading... " + file.progress + "%";
             }).success(function (data, status, headers, config) {
                 $rootScope.photos = $rootScope.photos || [];
                 data.context = {custom: {photo: title}};
                 file.result = data;
                 $rootScope.photos.push(data);
                 $scope.Data.media.push(data.public_id);
                 //$scope.imgData[key].showProgress = false;
             }).error(function (data, status, headers, config) {
                 file.result = data;
             });
         }
    });


    app.controller("addSpotController",function($scope,$rootScope,$timeout,geoComplete,$mdSidenav,$q, $mdToast,navService,$http,$geolocation,Upload, cloudinary) {
        $scope.Data = {

        };

        $scope.Data.tags = [];
        $scope.spots = [];
        $scope.Data.media = [];
        var count = 0;
        var search_count = 0;
        var edit_condition = 0;
        var forms = ["form1.tpl.html"];
        $scope.displayedForms = [];
        $scope.selectedItem  = null;
        $scope.searchText    = null;
        $scope.contentText = { content : 'Hello World' };
        $scope.headerTitle = 'Add a Spot';
        $scope.data = {};
        $scope.disp = false;
        $scope.edit = false;
        $scope.imgDisp= false;
        $scope.auto = true;
        $scope.imgFiles = [];
        $scope.files=[];
        $scope.imgItems = ['a','b','c','d','e'];
        $scope.imgTitle = 'Upload images here....';
        $scope.showProgress = true;
        $scope.imgData = [];
        $scope.imKey = 0;
        $scope.uploading = false;
        $scope.try= 0;
        /**
         * File Watcher
         */
        $scope.$watch(
            function watchFoo( scope ) {
                // Return the "result" of the watch expression.
                return( $scope.imgData.length );
            },
            function handleFooChange( newValue, oldValue ) {
                console.log( "fn( $scope.imgDisp ):", newValue );
                if(newValue == 0){
                    $scope.imgDisp = false;
                    $scope.imgTitle = 'Upload images here....';
                }
                else{
                    //$scope.autoUpload();

                }
            }
        );





        $scope.startTimeout = function () {

            var count1 = $scope.Data.media.length;
            var count2 = $scope.imgData.length;
            mytimeout = $timeout($scope.startTimeout, 6000);

            console.log("Count1: "+count1+" Count2: "+count2);
            if(count1 != count2){
              $scope.try+=1;
            }else{
                $scope.stopTimeout();
            }

            console.log("Try: "+$scope.try);

            if($scope.try == 20){
                $scope.stopTimeout();
            }

        }


        $scope.stopTimeout = function () {
            $timeout.cancel(mytimeout);
            //alert("Timer Stopped");
            if($scope.try == 5){
                $scope.uploading = false;
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Something went wrong!!!!')
                        .hideDelay(1000)
                );
            }else{
                $http.post('/addspot', $scope.Data).success(function (response) {
                    console.log(response);
                    if (response == "success") {
                        $scope.Data = {
                            spot: '',
                            city: '',
                            state: '',
                            zip: '',
                            coordinates: '',
                            description: '',
                            fullname: '',
                            media: [],
                            tags: []
                        };
                        $scope.selectedItem = null;
                        $scope.searchText = null;
                        $scope.imgDisp = false;
                        $scope.imgData = [];
                        $scope.disp = false;
                        $scope.uploading = false;
                        $scope.displayedForms.splice(0,1);
                        count = 0;
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent("Success")
                                .hideDelay(1000)
                        );
                    }

                });
            }

        };


        /**
         * This function gets the current geo-location and sets the map according to it
         */
        $geolocation.getCurrentPosition({
            timeout: 60000
        }).then(function(position) {
            $scope.data.center = [position.coords.latitude,position.coords.longitude];
        });

        /**
         *
         * This function sets the map after marker is dragged and after search
         */
        $scope.align = function(map, marker){
            console.log(marker.getPosition());
            //$scope.data.zoom = 12;
            map.setCenter(marker.getPosition());
            $scope.Data.coordinates = marker.getPosition().lat()+','+marker.getPosition().lng();
        }


        /**
         * This function returns the suggested cities on search
         * @param query
         * @returns { Places Suggestions }
         */
        $scope.querySearch = function(query){
            $scope.address = '';
            $scope.address = query;

            if(edit_condition == 0) {
                geoComplete.cities(query).then(function (cities) {
                    $scope.spots = cities;
                });
                var results = query ? $scope.spots : [];
                console.log(results);
                return results;
            }

        };


        /**
         * This function sets the info window on google map and city on auto-complete textbox
         * @param name
         * @returns {Sets name in the autocomplete textbox}
         */
        $scope.setName = function(name){
            $scope.contentText.content = name;
            console.log($scope.contentText);

            if(count==0) {
                //$scope.displayedForms.push(forms[0]);
                //$scope.dispWindow = forms[0];
                $scope.displayedForms.push(forms[0]);
                count = 1;
            }
            $scope.disp = true;


            var name_arr = name.split(',');
            var aSize = name_arr.length;
            if(aSize>1){
                var sd = name_arr[aSize-2].split(' ');
                var ll = sd.length;
                var sdf = parseInt(sd[ll-1].charAt(0), 10);
                console.log(angular.isNumber(sdf));
                angular.forEach(sd, function(value, key) {
                    console.log(key);
                });
                $scope.city = name_arr[aSize-3];
            }
            $scope.Data.fullname = name;
            $scope.Data.spot = name_arr[0];
            return name_arr[0];
        };


        $scope.removeTagOnBackspace = function (event) {
            if (event.keyCode === 8) {
                //$scope.dispWindow = null;
                $scope.displayedForms.splice(0,1);
                count = 0;
            }
        };


        $scope.onChange = function(cbState) {
            //$scope.message = cbState;
            console.log(cbState);
            if(cbState){
                edit_condition = -1;
            }else{
                edit_condition = 0;
            }
        };


        /**
         *
         * Function to save data
         */
        $scope.save = function(){
            $scope.uploading = true;
            var condition = 1;
            var im_ar = [];
            var files = $scope.imgData;

            $mdToast.show(
                $mdToast.simple()
                    .textContent('Uploading Data..')
                    .hideDelay(2000)
            );

            if(files){
               angular.forEach(files, function(file){
                   im_ar.push(file.file);
                 }) ;
               if(!$scope.auto)
               condition = $scope.bulkUpload(im_ar);
            }


            $scope.startTimeout();

        };


        /**
         * Function to clear all the form fields
         */
        $scope.clear = function(){
            $scope.Data = {
                spot: '',
                city: '',
                state: '',
                zip: '',
                coordinates: '',
                description: '',
                fullname: '',
                media: [],
                tags: []
            };
            $scope.selectedItem  = null;
            $scope.searchText    = null;
            $scope.imgDisp = false;
            $scope.files = '';
            $scope.disp = false;
            $scope.displayedForms.splice(0,1);
            count = 0;
        }


        $scope.uploadFiles = function(files){
             $scope.imgDisp = true;
            if(files){
                angular.forEach(files, function(file){
                    var tdata = {};
                    var d = new Date();
                    var title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
                    if (file && !file.$error) {
                        $scope.imgTitle = file.name;
                        tdata.name = title;
                        tdata.file = file;
                        tdata.showProgress = true;
                        tdata.progress = 0;
                        $scope.imgData.push(tdata);
                        if($scope.auto == true){
                            $scope.autoUpload($scope.imgData[$scope.imKey]);
                        }
                        $scope.imKey+=1;
                    }
                });
            }
            console.log($scope.imgData);
            $scope.imgTitle = 'Upload images here....';
           };



        $scope.bulkUpload = function(bulkData){
            var icount = bulkData.length;

            angular.forEach(bulkData, function(file){
                var d = new Date();
                var title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
                file.upload = Upload.upload({
                    url: "https://api.cloudinary.com/v1_1/" + 'travelindia' + "/upload",
                    data: {
                        upload_preset: "oayw5ldd",
                        tags: 'myphotoalbum',
                        context: 'photo=' + title,
                        file: file
                    }
                }).progress(function (e) {

                }).success(function (data, status, headers, config) {
                    $rootScope.photos = $rootScope.photos || [];
                    data.context = {custom: {photo: title}};
                    file.result = data;
                    $rootScope.photos.push(data);
                    $scope.Data.media.push(data.public_id);
                }).error(function (data, status, headers, config) {
                    file.result = data;
                    //$scope.status = -1;
                });
            });

        };


        /**
         * Auto Image Upload Function
         * @param idata
         */
        $scope.autoUpload = function(idata){
            idata.file.upload = Upload.upload({
                url: "https://api.cloudinary.com/v1_1/" + 'travelindia' + "/upload",
                data: {
                    upload_preset: "oayw5ldd",
                    tags: 'myphotoalbum',
                    context: 'photo=' + idata.name,
                    file: idata.file
                }
            }).progress(function (e) {
                idata.progress = Math.round((e.loaded * 100.0) / e.total);
                //file.status = "Uploading... " + file.progress + "%";
            }).success(function (data, status, headers, config) {
                $rootScope.photos = $rootScope.photos || [];
                data.context = {custom: {photo: idata.name}};
                idata.file.result = data;
                $rootScope.photos.push(data);
                $scope.Data.media.push(data.public_id);
                idata.showProgress = false;
            }).error(function (data, status, headers, config) {
                idata.result = data;
            });
        };


        $scope.remove = function($index) {
            $scope.imgData.splice($index, 1);
        }

        $scope.selectItem = selectItem;
        $scope.toggleItemsList = toggleItemsList;
        $scope.title = 'Hello';
        $scope.showSimpleToast = showSimpleToast;
        $scope.toggleRightSidebar = toggleRightSidebar;

        navService
         .loadAllItems()
         .then(function(menuItems) {
                $scope.menuItems = [].concat(menuItems);
         });

        navService.loadAllItems();

        $scope.menuItems = [
            {
                name: 'Dashboard',
                icon: 'dashboard',
                sref: '.dashboard'
            },
            {
                name: 'Profile',
                icon: 'person',
                sref: '.profile'
            },
            {
                name: 'Table',
                icon: 'view_module',
                sref: '.table'
            }
        ];


        function toggleRightSidebar() {
            $mdSidenav('right').toggle();
        }

        function toggleItemsList() {
        //    var pending = $mdBottomSheet.hide() || $q.when(true);

            //pending.then(function(){
                $mdSidenav('left').toggle();
            //});
        }

        function selectItem (item) {
            $scope.title='';
            $scope.toggleItemsList();
            $scope.showSimpleToast(vm.title);
        }


        function showSimpleToast(title) {
            $mdToast.show(
                $mdToast.simple()
                    .content(title)
                    .hideDelay(2000)
                    .position('bottom right')
            );
        }

    });

})();
