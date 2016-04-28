<div class="widget-main z-depth-5">
    <nav class="widget-navbar grey darken-3">
        <div class="nav-wrapper">
            <a href="http://www.atinternet.com" class="brand-logo">
                <img class="wiget-logo-content"
                     src="//static-aws-dev.atinternet-solutions.com/Images/at_internet.png"></img>
                <span class="wiget-logo-content grey-text text-lighten-1">AT Internet Bookmarklet</span>
            </a>
            <button type="button" class="right close-btn" title="close" id="btn-close">×</button>
        </div>
    </nav>
    <div class="card result-container">
        <div class="card-content">
            <div class="graph-header">
                <span class="card-title" id="graph-title">Last hour visits</span>
                <div class="loading-container">
                    <div class="preloader-wrapper small active" id="loader">
                        <div class="spinner-layer spinner-blue-only">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div>
                            <div class="gap-patch">
                                <div class="circle"></div>
                            </div>
                            <div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <canvas class="graph-container" id="graph-container"></canvas>
        </div>
    </div>
</div>
