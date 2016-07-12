<div class="widget-main z-depth-5" id="widget-container">
    <style> @import "//cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.css"; </style>
    <nav class="widget-navbar grey darken-3 minimized-content pointer" id="minimized-logo" title="show">
        <div class="nav-wrapper">
            <a class="brand-logo">
                <img class="widget-logo-content"
                     src="//static-aws-dev.atinternet-solutions.com/Images/at_internet.png"></img>
            </a>
        </div>
    </nav>
    <div class="full-size maximized-content">
        <nav class="widget-navbar grey darken-3" id="maximized-nav">
            <div class="nav-wrapper">
                <a target="_blank" href="https://apps.atinternet-solutions.com" class="brand-logo">
                    <img class="widget-logo-content"
                         src="//static-aws-dev.atinternet-solutions.com/Images/at_internet.png"></img>
                    <span class="widget-logo-content grey-text text-lighten-1">AT Internet Bookmarklet</span>
                </a>
                <button type="button" class="right btn-header" title="close" id="btn-close">x</button>
                <button type="button" class="right btn-header" title="hide" id="btn-hide">-</button>
                <button type="button" class="right btn-header btn-link" title="disconnect" id="btn-disconnect">( disconnect )</button>
            </div>
        </nav>
        <div class="tab-frame tab-data">
            <input type="radio" checked name="tab" id="tab1">
            <label for="tab1">Summary</label>

            <input type="radio" name="tab" id="tab2">
            <label for="tab2">Evolution</label>

            <input type="radio" name="tab" id="tab3">
            <label for="tab3">Referrer</label>

            <div class="tab">

                        <div class="graph-header">
                            <span class="card-title left" id="graph-title">Last hour</span>
                            <div class="toggle-background">
                                <div class="toggle-switch pointer" id="btn-switch-period" title="Today">
                                </div>
                            </div>
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
                        <div id="chip-container" class="chip-container"></div>
                        <canvas class="graph-container" id="graph-container"></canvas>


            </div>
            <div class="tab">sample content 2</div>
            <div class="tab">sample content 3</div>
        </div>

    </div>
</div>