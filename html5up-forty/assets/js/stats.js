function e(stringToEscape) {
    if (stringToEscape == undefined) {
        return "";
    }
    if (encodeURIComponent instanceof Function) {
        return encodeURIComponent(stringToEscape);
    } else {
        escapedString = escape(stringToEscape);
        escapedString = escapedString.replace(/\//g,"%2F");
        escapedString = escapedString.replace(/\?/g,"%3F");
        escapedString = escapedString.replace(/=/g,"%3D");
        escapedString = escapedString.replace(/&/g,"%26");
        escapedString = escapedString.replace(/@/g,"%40");
        return escapedString;
    }
}

function stat(thisUrl, imageLocation) {
    n=navigator;
    d=document;

    //check browser language and referer
    lang=n.language?n.language:n.browserLanguage;
    ref=d.referrer?d.referrer:"";

    // check plugins
    pluginNames='';
    // n.plugins[i].name, n.plugins[i].filename, n.plugins[i].description
    for (i=0;i<n.plugins.length;i++) {
        if (n.plugins[i].name == "Shockwave Flash") {
            pluginNames += '&p(' + i + ')sf=' + e(n.plugins[i].description.substring(16));
        } else {
            pluginNames += '&p(' + i + ')=' + e(n.plugins[i].name);
        }
    }
    if (pluginNames=='') {
        pluginNames='&p=0';
    }

    var viewportwidth = 0;
    var viewportheight = 0;
    if (window.innerWidth) {
        viewportwidth = window.innerWidth
        viewportheight = window.innerHeight
    } else if (document.documentElement && document.documentElement.clientWidth &&
        document.documentElement.clientWidth != 0)
    {
        viewportwidth = document.documentElement.clientWidth
        viewportheight = document.documentElement.clientHeight
    } else {
        viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
            viewportheight = document.getElementsByTagName('body')[0].clientHeight
    }

    statString=
        imageLocation+'jl.php'+
        '?url='+e(thisUrl)+
        '&ref='+e(ref)+
        '&br='+e(n.appName)+
        '&v='+e(n.version)+
        '&l='+e(lang)+
        '&sy='+e(n.platform)+
        '&u='+e(n.userAgent)+
        '&ja='+e(n.javaEnabled()?1:0)+
        '&co='+e((n.cookieEnabled)?1:0)+
        pluginNames+
        '&scvw='+viewportwidth+
        '&scvh='+viewportheight+
        '&scw='+screen.width+
        '&sch='+screen.height+
        '&d='+e(new Date());

    document.writeln('<img height="1" width="1" alt="" src="' + statString + '" />');
}
