from flask_assets import Bundle

bundles = {

    'home_js': Bundle(
        'js/vendor/jquery-3.3.1.js',
        'js/vendor/popper.js',
        'js/vendor/bootstrap-4.1.3.js',
        'js/vendor/zingchart.min.js',
        # 'js/vendor/jspdf.debug.js',
        # 'js/vendor/jspdf.min.js',
        'js/vendor/jspdf2.min.js',
        'js/vendor/jspdf.plugin.autotable.js',
        'js/vendor/script.js',
        'js/vendor/bootstrap-datepicker.js',
        'js/vendor/grid.js',
        'js/vendor/print.js',
        filters='jsmin',
        output='gen/home.%(version)s.js'),

    'home_css': Bundle(
        'css/vendor/bootstrap-4.1.3.css',
        'css/vendor/error404.css',
        'css/custom.css',
        'css/vendor/bootstrap-datepicker3.css',
        'css/vendor/font-awesome.min.css',
        'css/vendor/all.css',
        filters='cssmin',
        output='gen/home.%(version)s.css'),

    # 'admin_js': Bundle(
    #     'js/lib/jquery-1.10.2.js',
    #     'js/lib/Chart.js',
    #     'js/admin.js',
    #     output='gen/admin.js'),

    # 'admin_css': Bundle(
    #     'css/lib/reset.css',
    #     'css/common.css',
    #     'css/admin.css',
    #     output='gen/admin.css')
}
