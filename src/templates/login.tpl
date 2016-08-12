<div class="widget-login z-depth-5"  id="widget-container-login">
    <style> @import "//cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.css"; </style>
    <nav class="widget-navbar grey darken-3" id="login-logo">
        <div class="nav-wrapper">
            <a target="_blank" href="https://apps.atinternet-solutions.com" class="brand-logo">
                <img class="widget-logo-content"
                     src="//static-aws-dev.atinternet-solutions.com/Images/at_internet.png">
                <span class="widget-logo-content grey-text text-lighten-1">AT Internet Bookmarklet</span>
            </a>
            <button type="button" class="right btn-close btn-header" title="close" id="btn-close">x</button>
        </div>
    </nav>
    <div class="row">
        <form class="col s12">
            <div class="row">
                <div class="input-field col s8 offset-s2">
                    <input id="email" type="email" class="validate">
                    <label class="active" for="email">Email</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s8 offset-s2">
                    <input id="password" type="password" class="validate">
                    <label class="active" for="password">Password</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s5 offset-s1 form-font">
                    <input type="checkbox" id="chkKeepConnected" />
                    <label for="chkKeepConnected">keep connected</label>
                </div>
                <div class="input-field col s5 right-align form-font">
                    <a class="waves-effect waves-light btn" id="btnLogin">Login</a>
                </div>
            </div>
            <div class="row center-align">
                <label id="loginMessage" class="red-text"></label>
            </div>
        </form>
    </div>
</div>