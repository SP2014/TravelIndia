/**
 * Created by Aashish on 3/3/2016.
 */
(function(){
    'use strict';
    angular.module('myApp',['ngAnimate', 'ngMaterial', 'GoogleMapsNative', 'angularTrix','geocomplete' ,'app',
                   'ngGeolocation','ngFileUpload', 'ngRoute', 'cloudinary', 'appControllers']).
        config(function ($mdThemingProvider, $mdIconProvider, $routeProvider){

            $routeProvider.when('/', {
                templateUrl: '/views/partials/console.htm',
                controller: 'console',
                title: 'Travel India - Console'
            }).when('/add', {
                templateUrl: '/views/partials/addSpot.htm',
                controller: 'addSpotController',
                title: 'Travel India - Add Spot'
                //controller: 'photoUploadCtrl'
            }).when('/view',{
                templateUrl: '/views/partials/viewSpot.htm',
                title: 'Travel India - View'
            }).otherwise({
                redirectTo: '/'
            });



            $mdThemingProvider
                .theme('default')
                .primaryPalette('grey', {
                    'default': '600'
                })
                .accentPalette('teal', {
                    'default': '500'
                })
                .warnPalette('defaultPrimary');

            $mdThemingProvider.theme('dark', 'default')
                .primaryPalette('defaultPrimary')
                .dark();

            $mdThemingProvider.theme('grey', 'default')
                .primaryPalette('grey');

            $mdThemingProvider.theme('custom', 'default')
                .primaryPalette('defaultPrimary', {
                    'hue-1': '50'
                });

            $mdThemingProvider.definePalette('defaultPrimary', {
                '50':  '#FFFFFF',
                '100': 'rgb(255, 198, 197)',
                '200': '#E75753',
                '300': '#E75753',
                '400': '#E75753',
                '500': '#E75753',
                '600': '#E75753',
                '700': '#E75753',
                '800': '#E75753',
                '900': '#E75753',
                'A100': '#E75753',
                'A200': '#E75753',
                'A400': '#E75753',
                'A700': '#E75753'
            });

            $mdIconProvider.icon('user', 'assets/images/user.svg', 64);
            $mdIconProvider
                .defaultIconSet("assets/svg/avatars.svg", 128)
                .icon("menu"       , "../assets/svg/menu.svg"        , 48)
                .icon("share"      , "../assets/svg/share.svg"       , 48)
                .icon("search"     , "../assets/svg/search.svg"      ,48)
                .icon("add"        , "../assets/svg/add.svg"         ,48)
                .icon("terrain"    , "../assets/svg/terrain.svg"     ,48)
                .icon("city"    , "../assets/svg/city.svg"     ,48)
                .icon("place"    , "../assets/svg/place.svg"     ,48)
                .icon("state"    , "../assets/svg/black.svg"     ,48)
                .icon("zip"    , "../assets/svg/zip.svg"     ,48)
                .icon("select"    , "../assets/svg/interface.svg"     ,48)
                .icon("remove"    , "../assets/svg/remove.svg"     ,48)
                .icon("notification","../assets/svg/notifications.svg",48)
                .icon("dash"        ,"../assets/svg/tool.svg"         ,512)
                .icon("view"        ,"../assets/svg/web.svg"         ,512)
                .icon("add"        ,"../assets/svg/pin.svg"         ,512);
        });
})();