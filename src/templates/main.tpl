<div class="widget-main z-depth-5" id="widget-container">
    <style> @import "//cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.css"; </style>
    <style> @import "//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css"; </style>
    <nav class="widget-navbar grey darken-3 minimized-content pointer" id="minimized-logo" title="show">
        <div class="nav-wrapper">
            <a class="brand-logo">
                <img class="widget-logo-content"
                     src="//static-aws.atinternet-solutions.com/Images/at_internet.png"/>
            </a>
        </div>
    </nav>
    <div class="full-size maximized-content">

        <nav class="widget-navbar grey darken-3" id="maximized-nav">
            <div class="nav-wrapper">
                <a target="_blank" href="https://apps.atinternet-solutions.com" class="brand-logo">
                    <img class="widget-logo-content"
                         src="//static-aws.atinternet-solutions.com/Images/at_internet.png"/>
                    <span class="widget-logo-content grey-text text-lighten-1">AT Internet Bookmarklet</span>
                </a>
                <button type="button" class="right btn-header" title="close" id="btn-close">x</button>
                <button type="button" class="right btn-header" title="hide" id="btn-hide">-</button>
                <button type="button" class="right btn-header btn-link" title="disconnect" id="btn-disconnect">disconnect</button>
            </div>
        </nav>

        <div class="switch-container">
            <span class="card-title left" id="graph-title">Today</span>
            <div class="toggle-background">
                <div class="toggle-switch pointer" id="btn-switch-period" title="From article begin">
                </div>
            </div>
        </div>

        <div class="placeHolder100" id="placeHolder1"></div>
        <div class="placeHolder50" id="placeHolder2"></div>
        <div class="placeHolder_Summary_50" id="placeHolder3"></div>
        <div class="placeHolder_Summary_50" id="placeHolder4"></div>

    </div>
</div>
