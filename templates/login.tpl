<div class="widget-login z-depth-5"  id="widget-container-login">
    <nav class="widget-navbar grey darken-3" id="login-logo">
        <div class="nav-wrapper">
            <a href="http://www.atinternet.com" class="brand-logo">
                <img class="wiget-logo-content"
                     src="//static-aws-dev.atinternet-solutions.com/Images/at_internet.png"></img>
                <span class="wiget-logo-content grey-text text-lighten-1">AT Internet Bookmarklet</span>
            </a>
            <button type="button" class="right btn-close btn-header" title="close" id="btn-close">×</button>
        </div>
    </nav>
    <div class="row">
        <form class="col s12">
            <div class="row">
                <div class="input-field col s6 offset-s3">
                    <input id="email" type="email" class="validate"></input>
                    <label class="active" for="email">Email</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6 offset-s3">
                    <input id="password" type="password" class="validate"></input>
                    <label class="active" for="password">Password</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s3 offset-s3 form-font">
                    <input type="checkbox" id="chkKeepConnected" />
                    <label for="chkKeepConnected">keep connected</label>
                </div>
                <div class="input-field col s3 right-align form-font">
                    <a class="waves-effect waves-light btn" id="btnLogin">Login</a>
                </div>
            </div>
            <div class="row center-align">
                <label id="loginMessage" class="red-text"></label>
            </div>
        </form>
    </div>
</div>