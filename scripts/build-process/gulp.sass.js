const gulp = require('gulp');
const gulp_sass = require('gulp-sass')(require('sass'));
const gulp_concat = require('gulp-concat')
const gulp_minify = require("gulp-minify")

const sassFilesInOrderOfPriority = [
     "./src/ns/assets/sass/common/Header/Header.scss",
     "./src/ns/assets/sass/common/Footer/Footer.scss",
     "./src/ns/assets/sass/common/Enrollbtn/Enrollbtn.scss",
     "./src/ns/assets/sass/common/screen/Animations.scss",
     "./src/ns/assets/sass/common/dialogHost/dialogHost.scss",
     "./src/ns/assets/sass/common/enrollDialog/enrollDialog.scss",
     "./src/ns/assets/sass/common/Variables/Global.scss",
     "./src/ns/assets/sass/home.view.style/BannerSection/Banner.scss",
     "./src/ns/assets/sass/home.view.style/Pains&GainsSection/Pride.scss",
     "./src/ns/assets/sass/home.view.style/EffectiveStudentsSection/Goals.scss",
     "./src/ns/assets/sass/home.view.style/InsightNdejjeSection/Insights.scss",
     "./src/ns/assets/sass/home.view.style/HeadMasterSection/Quote.scss",
     "./src/ns/assets/sass/home.view.style/StudentThoughtsSection/reviews.scss",
     "./src/ns/assets/sass/home.view.style/MissionSection/mission.scss",
     "./src/ns/assets/sass/home.view.style/Joy&PrideSection/edu.scss",
     "./src/ns/assets/sass/aboutus.view.style/welcomeNoteSection/WelcomeNote.scss",
     "./src/ns/assets/sass/aboutus.view.style/GlanceSection/Glance.scss",
     "./src/ns/assets/sass/aboutus.view.style/VisionSection/Xgoal.scss",
     "./src/ns/assets/sass/aboutus.view.style/StaffViewSection/StaffView.main.scss",
     "./src/ns/assets/sass/aboutus.view.style/StaffViewSection/StaffView.main.scss",
     "./src/ns/assets/sass/aboutus.view.style/StaffViewSection/StaffView.Member.scss",
     "./src/ns/assets/sass/aboutus.view.style/StaffViewSection/StaffView.dialog.scss",
     "./src/ns/assets/sass/aboutus.view.style/StudentsVideoSection/VidInterview.scss",
     "./src/ns/assets/sass/aboutus.view.style/CoreValuesSection/corevalues.scss",
     "./src/ns/assets/sass/aboutus.view.style/HistorySection/history.scss",
     "./src/ns/assets/sass/academics.view.style/WelcomeNoteSection/WelcomeBanner.scss",
     "./src/ns/assets/sass/academics.view.style/StudentLifeSection/studentslife.scss",
     "./src/ns/assets/sass/academics.view.style/AwardsSection/AwardsSection.scss",
     "./src/ns/assets/sass/academics.view.style/CommunitySection/academicsCommunity.scss",
     "./src/ns/assets/sass/academics.view.style/VideoVoicesSection/voices.scss",
     "./src/ns/assets/sass/academics.view.style/UniformDesignSection/uniformDesign.scss",
     "./src/ns/assets/sass/academics.view.style/DOSQuoteSection/academicsDosQuote.scss",
    //  "./src/ns/assets/sass/blog.view.style/titleHolderSection/titleholder.scss",
    //  "./src/ns/assets/sass/blog.view.style/blogtrends/blogtrends.scss",
    // //  "./src/ns/assets/sass/blog.view.style/articleSection/articlesection.scss",
    // //  "./src/ns/assets/sass/blog.view.style/blogSections/blogsection3.scss",
    //  "./src/ns/assets/sass/blog.view.style/carosell slider/carosellslider.scss",
    //  "./src/ns/assets/sass/blog.view.style/blogSections/blogsection2.scss",
     "./src/ns/assets/sass/common/screen/mediaqueries.scss",
]


function __errorHandler(e) {
    console.log(e.message)
}

function compileSassFiles(){

    return gulp.src(sassFilesInOrderOfPriority)
        .pipe(gulp_sourcemaps.init())
        .pipe(gulp_sass().on('error', __errorHandler))
        .pipe(gulp_minify())
        .pipe(gulp_concat("workbench.main.css"))
        .pipe(gulp.dest("./out/ns/workbench"))
    

}

exports.SASSBuild = compileSassFiles;