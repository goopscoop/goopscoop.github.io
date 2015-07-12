var ExploreWidget = angular.module('ExploreWidget',[])


ExploreWidget.controller('ExploreCtrl', ['$scope', function($scope){

  var Project = function( name, links, languages, frameworks, database, other, versionControl ){
    this.name = name;
    this.shortDesc = "";
    this.links = links;
    this.linkText = ["Learn More", "Visit Site", "Github"];
    this.languages = languages || "";
    this.frameworks = frameworks || "";
    this.database = database || "";
    this.other = other || "";
    this.versionControl = versionControl || "Github";
  }

  //Building DevBox
  var devboxLinks = [ "#devbox", "http://www.devbox.tools", "https://github.com/goopscoop/dev_box" ];
  var devboxLang = [ "Ruby", "JavaScript", "ActiveRecord", "HTML5", "CSS3" ];
  var dbFram = [ "AngularJS", "Ruby on Rails", "jQuery", "Materialize.css", "Papertrail" ];
  var dbOther = [ "oAuth", "Markdown", "RESTful Routing", "API Server", "Responsive Design" ];

  var devbox = new Project( 'DevBox.tools', devboxLinks, devboxLang, dbFram, "PostgreSQL", dbOther )
  devbox.shortDesc = "DevBox.tools is a place where developers can discover, save, collect, and reference the libraries, frameworks and other tools they need to get the job done.";

  //Building MemoryLn
  var memLinks = [ "#memory-ln", "http://www.memoryln.me", "https://github.com/goopscoop/memory_lane" ];
  var memLang = [ "Ruby", "JavaScript", "ActiveRecord", "HTML5", "CSS3" ];
  var memFram = [ "Ruby on Rails", "jQuery", "jQuery-UI", "Bootstrap", "Spin.js", "scrollReveal.js" ]
  var memOther = [ "RESTful Routing", "Cloudinary API" ];

  var memLn = new Project( 'Memory Lane', memLinks, memLang, memFram, "PostgreSQL", memOther )
  memLn.shortDesc = "A fun place to upload your photos to make cusomizable, animated, scolling pages that show off your favorite memories."

  var lunchLinks = ["#lunchbreak", "http://www.lunchbreak.ninja", "https://github.com/goopscoop/lunchbreakninja" ];
  var lunchLang = [ "JavaScript", "HTML5", "CSS3" ];
  var lunchFram = [ "Node.js", "Express", "jQuery", "jQuery-UI", "Sequelize", "Bootstrap", "Async" ];
  var lunchOther = [ "oAuth", "Responsive Design", "Yelp API", "Google Geocoding API" ];

  var lunchNinja = new Project( 'LunchBreak.ninja', lunchLinks, lunchLang, lunchFram, "PostgreSQL", lunchOther )
  lunchNinja.shortDesc = "With a single click, discover highly reviewed restuarnts that fit your tastes within walking distance."


  $scope.mySkills = [devbox, memLn, lunchNinja];
  console.log($scope.mySkills)

}]);

ExploreWidget.directive( 'cbskills', function(){
  var link = function( scope, element, attrs ){
    scope.allFrameworks = {}
    scope.allLanguages = {}
    scope.allOther = {}
    scope.showSkills = true;
    scope.showProjects = false;
    scope.showSelectedProject = false;

    scope.openSkill = function(activeSkill, projects){
      scope.showSkills = false;
      scope.showProjects = true;
      scope.showSelectedProject = false;
      scope.menuProjects = projects;
      scope.activeSkill = activeSkill;
    }

    scope.skillFromProjectDisplay = function(framework){
      scope.showSkills = false;
      scope.showProjects = true;
      scope.showSelectedProject = false;
      scope.activeSkill = framework;
      scope.menuProjects = scope.allFrameworks[framework] || scope.allLanguages[framework] || scope.allOther[framework];
    }

    scope.backFromProjectDisplayToProjectList = function(){
      scope.showSkills = false;
      scope.showProjects = true;
      scope.showSelectedProject = false;
    }

    scope.backToSkills = function(){
      scope.showSkills = true;
      scope.showProjects = false;
      scope.showSelectedProject = false;
    }

    scope.openProject = function(project){
      scope.showSkills = false;
      scope.showProjects = false;
      scope.showSelectedProject = true;
      scope.displayProjectProperties = $.grep(scope.skills, function( e ){
        return e.name === project;
      });
        console.log(scope.displayProjectProperties)
    }

    scope.skills.forEach( function( el, ind, arr ){
      var name = el.name;
      el.languages.forEach( function( el, ind, arr ){
        if( scope.allLanguages[el] ){
          scope.allLanguages[el].push( name );
        } else {
          scope.allLanguages[el] = [];
          scope.allLanguages[el].push( name );
        }
      });
      el.frameworks.forEach( function( el, ind, arr ){
        if( scope.allFrameworks[el] ){
          scope.allFrameworks[el].push( name );
        } else {
          scope.allFrameworks[el] = [];
          scope.allFrameworks[el].push( name );
        }
      });
      el.other.forEach( function( el, ind, arr ){
        if( scope.allOther[el] ){
          scope.allOther[el].push( name );
        } else {
          scope.allOther[el] = [];
          scope.allOther[el].push( name );
        }
      });
    });


  // console.log(allFrameworks)
  }


  return {
    restrict: 'E',
    templateUrl: '/js/skillsWidget.html',
    replace: true,
    scope: {
      skills: "="

    },
    link: link
  }

});