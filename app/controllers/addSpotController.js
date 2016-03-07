/**
 * Created by Aashish on 3/2/2016.
 */
(function(){

    angular.module('myApp').controller('addSpotController',['$mdSidenav','$q', '$mdToast','$scope','navService','NgMap',addSpot]);

    angular.module('myApp').run(function ($rootScope) {
       var name =  $rootScope.address;
       //$rootScope.address =
       console.log(name);
    });

    function addSpot(navService, $mdSidenav, $q,  $scope, $mdToast, NgMap){
        var map;
        var vm = this;
        vm.lat = '28.8913703';
        vm.lng = '79.5630639';


        vm.latlng = [28.8913703, 79.5630639];

        NgMap.getMap().then(function(map) {
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
            console.log(map);
            map = map;

        });

        $scope.$on('mapInitialized', function(event, map) {
            //vm.map = map;
        });

        vm.foo = function(event, arg1, arg2) {
            alert('this is at '+ this.getPosition());

        }

        /*NgMap.getMap().then(function(map) {

            vm.geocoder = map.Geocoder();

        });*/

       $scope.mycallback = function(map) {
            $scope.mymap = map;
            $scope.$apply();
        };





        vm.headerTitle = 'Add a Spot';

        $scope.name = '';
        $scope.city = '';
        $scope.state = '';

        $scope.address = 'Indore';
        $scope.tags=[];



        var index = 0;
        $scope.change = function() {
            var ar = $scope.name;
            $scope.address = ar;
            //vm.mymap.setCenter($scope.address);
            //$scope.coordinate = vm.mymap.getCenter().lat()+','+vm.mymap.getCenter().lng();
            //vm.positions = [vm.mymap.getCenter().lat(),vm.mymap.getCenter().lng()];
            index++;
        };

        /*$scope.deleteWord = function(event){
            if (event.keyCode === 8) {
                var temp = $scope.name;
                $scope.address = '';
                $scope.address = temp;
            }
        }*/

        //vm.menuItems = [ ];
        vm.selectItem = selectItem;
        vm.toggleItemsList = toggleItemsList;
        //vm.showActions = showActions;
        //vm.title = $state.current.data.title;
        vm.title = 'Hello';
        vm.showSimpleToast = showSimpleToast;
        vm.toggleRightSidebar = toggleRightSidebar;

        /*navService
            .loadAllItems()
            .then(function(menuItems) {
                vm.menuItems = [].concat(menuItems);
            });*/

        //navService.loadAllItems();

        vm.menuItems = [
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

        //vm.menuItems = [].concat(navItems);

        function toggleRightSidebar() {
            $mdSidenav('right').toggle();
        }

        function toggleItemsList() {
            var pending = $mdBottomSheet.hide() || $q.when(true);

            pending.then(function(){
                $mdSidenav('left').toggle();
            });
        }

        function selectItem (item) {
            //vm.title = item.name;
            vm.title='';
            vm.toggleItemsList();
            vm.showSimpleToast(vm.title);
        }

        /*function showActions($event) {
         $mdBottomSheet.show({
         parent: angular.element(document.getElementById('content')),
         templateUrl: 'app/views/partials/bottomSheet.html',
         controller: [ '$mdBottomSheet', SheetController],
         controllerAs: "vm",
         bindToController : true,
         targetEvent: $event
         }).then(function(clickedItem) {
         clickedItem && $log.debug( clickedItem.name + ' clicked!');
         });

         function SheetController( $mdBottomSheet ) {
         var vm = this;

         vm.actions = [
         { name: 'Share', icon: 'share', url: 'https://twitter.com/intent/tweet?text=Angular%20Material%20Dashboard%20https://github.com/flatlogic/angular-material-dashboard%20via%20@flatlogicinc' },
         { name: 'Star', icon: 'star', url: 'https://github.com/flatlogic/angular-material-dashboard/stargazers' }
         ];

         vm.performAction = function(action) {
         $mdBottomSheet.hide(action);
         };
         }
         }*/

        function showSimpleToast(title) {
            $mdToast.show(
                $mdToast.simple()
                    .content(title)
                    .hideDelay(2000)
                    .position('bottom right')
            );
        }

    }
})();
