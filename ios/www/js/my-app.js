/**
 * Global variables
 */
var g_dWidth = 0;
var g_dHeight = 0;

var $$ = Dom7;

// var SERVER_URL = "https://sparktest.salestratus.com/";
var SERVER_URL = "https://sparkbluedev.salestratus.com/";
// var SERVER_URL = "https://sparkblue.salestratus.com/";
// var SERVER_URL = "https://spark.salestratus.com/";
// var SERVER_URL = "https://sales.wsl/";

var g_adminId;
var g_userId;
var g_tradeshowId;

var g_username;
var g_password;

var g_currentCreateTime;
var g_currentBizUrl;
var g_currentNoteText;
var g_currentTradeshowName;
var g_currentTradeshow;
var g_currentCompanyName;
var g_syncCheck;
var g_currentStatus;
var g_scanType;
var g_currentLeadid;
var g_skipLogicEnabled;
var g_selfMode = false;
var g_groupID;
var g_groupRole;
var g_selfScanTimeout;
var g_onlineStatus;
var g_currentOcrStatus; // reflects the ocr status for the currently opened lead if any
var g_imageFolder = 'spark';

const ocrStatus = {
    'INPROGRESS': 'inprogress', // ocr is running in the background
    'TODO': 'todo', // ocr is schedualed (i.e. we are currently offline)
    'COMPLETE': 'complete' // ocr has finished
}

var selfregFields = [
    'First Name', 'Last Name', 'Email', 'Phone', 'Address',
    'City', 'ZipCode', 'State', 'Country'
];

var g_tradeshows;
var g_profileFields = []; //current tradeshow
var g_profileFieldsAllTrade = [];
var g_QAs = [];

var g_countries = [
    i18n("Andorra"),
    i18n("United Arab Emirates"),
    i18n("Afghanistan"),
    i18n("Antigua and Barbuda"),
    i18n("Anguilla"),
    i18n("Albania"),
    i18n("Armenia"),
    i18n("Angola"),
    i18n("Antarctica"),
    i18n("Argentina"),
    i18n("American Samoa"),
    i18n("Austria"),
    i18n("Australia"),
    i18n("Aruba"),
    i18n("Ã…land Islands"),
    i18n("Azerbaijan"),
    i18n("Bosnia and Herzegovina"),
    i18n("Barbados"),
    i18n("Bangladesh"),
    i18n("Belgium"),
    i18n("Burkina Faso"),
    i18n("Bulgaria"),
    i18n("Bahrain"),
    i18n("Burundi"),
    i18n("Benin"),
    i18n("Saint BarthÃ©lemy"),
    i18n("Bermuda"),
    i18n("Brunei Darussalam"),
    i18n("Bolivia"),
    i18n("Caribbean Netherlands "),
    i18n("Brazil"),
    i18n("Bahamas"),
    i18n("Bhutan"),
    i18n("Bouvet Island"),
    i18n("Botswana"),
    i18n("Belarus"),
    i18n("Belize"),
    i18n("Canada"),
    i18n("Cocos (Keeling) Islands"),
    i18n("Congo, Democratic Republic of"),
    i18n("Central African Republic"),
    i18n("Congo"),
    i18n("Switzerland"),
    i18n("CÃ´te d'Ivoire"),
    i18n("Cook Islands"),
    i18n("Chile"),
    i18n("Cameroon"),
    i18n("China"),
    i18n("Colombia"),
    i18n("Costa Rica"),
    i18n("Cuba"),
    i18n("Cape Verde"),
    i18n("CuraÃ§ao"),
    i18n("Christmas Island"),
    i18n("Cyprus"),
    i18n("Czech Republic"),
    i18n("Germany"),
    i18n("Djibouti"),
    i18n("Denmark"),
    i18n("Dominica"),
    i18n("Dominican Republic"),
    i18n("Algeria"),
    i18n("Ecuador"),
    i18n("Estonia"),
    i18n("Egypt"),
    i18n("Western Sahara"),
    i18n("Eritrea"),
    i18n("Spain"),
    i18n("Ethiopia"),
    i18n("Finland"),
    i18n("Fiji"),
    i18n("Falkland Islands"),
    i18n("Micronesia, Federated States of"),
    i18n("Faroe Islands"),
    i18n("France"),
    i18n("Gabon"),
    i18n("United Kingdom"),
    i18n("Grenada"),
    i18n("Georgia"),
    i18n("French Guiana"),
    i18n("Guernsey"),
    i18n("Ghana"),
    i18n("Gibraltar"),
    i18n("Greenland"),
    i18n("Gambia"),
    i18n("Guinea"),
    i18n("Guadeloupe"),
    i18n("Equatorial Guinea"),
    i18n("Greece"),
    i18n("South Georgia and the South Sandwich Islands"),
    i18n("Guatemala"),
    i18n("Guam"),
    i18n("Guinea-Bissau"),
    i18n("Guyana"),
    i18n("Hong Kong"),
    i18n("Heard and McDonald Islands"),
    i18n("Honduras"),
    i18n("Croatia"),
    i18n("Haiti"),
    i18n("Hungary"),
    i18n("Indonesia"),
    i18n("Ireland"),
    i18n("Israel"),
    i18n("Isle of Man"),
    i18n("India"),
    i18n("British Indian Ocean Territory"),
    i18n("Iraq"),
    i18n("Iran"),
    i18n("Iceland"),
    i18n("Italy"),
    i18n("Jersey"),
    i18n("Jamaica"),
    i18n("Jordan"),
    i18n("Japan"),
    i18n("Kenya"),
    i18n("Kyrgyzstan"),
    i18n("Cambodia"),
    i18n("Kiribati"),
    i18n("Comoros"),
    i18n("Saint Kitts and Nevis"),
    i18n("North Korea"),
    i18n("South Korea"),
    i18n("Kuwait"),
    i18n("Cayman Islands"),
    i18n("Kazakhstan"),
    i18n("Lao People's Democratic Republic"),
    i18n("Lebanon"),
    i18n("Saint Lucia"),
    i18n("Liechtenstein"),
    i18n("Sri Lanka"),
    i18n("Liberia"),
    i18n("Lesotho"),
    i18n("Lithuania"),
    i18n("Luxembourg"),
    i18n("Latvia"),
    i18n("Libya"),
    i18n("Morocco"),
    i18n("Monaco"),
    i18n("Moldova"),
    i18n("Montenegro"),
    i18n("Saint-Martin (France)"),
    i18n("Madagascar"),
    i18n("Marshall Islands"),
    i18n("Macedonia"),
    i18n("Mali"),
    i18n("Myanmar"),
    i18n("Mongolia"),
    i18n("Macau"),
    i18n("Northern Mariana Islands"),
    i18n("Martinique"),
    i18n("Mauritania"),
    i18n("Montserrat"),
    i18n("Malta"),
    i18n("Mauritius"),
    i18n("Maldives"),
    i18n("Malawi"),
    i18n("Mexico"),
    i18n("Malaysia"),
    i18n("Mozambique"),
    i18n("Namibia"),
    i18n("New Caledonia"),
    i18n("Niger"),
    i18n("Norfolk Island"),
    i18n("Nigeria"),
    i18n("Nicaragua"),
    i18n("The Netherlands"),
    i18n("Norway"),
    i18n("Nepal"),
    i18n("Nauru"),
    i18n("Niue"),
    i18n("New Zealand"),
    i18n("Oman"),
    i18n("Panama"),
    i18n("Peru"),
    i18n("French Polynesia"),
    i18n("Papua New Guinea"),
    i18n("Philippines"),
    i18n("Pakistan"),
    i18n("Poland"),
    i18n("St. Pierre and Miquelon"),
    i18n("Pitcairn"),
    i18n("Puerto Rico"),
    i18n("Palestine, State of"),
    i18n("Portugal"),
    i18n("Palau"),
    i18n("Paraguay"),
    i18n("Qatar"),
    i18n("RÃ©union"),
    i18n("Romania"),
    i18n("Serbia"),
    i18n("Russian Federation"),
    i18n("Rwanda"),
    i18n("Saudi Arabia"),
    i18n("Solomon Islands"),
    i18n("Seychelles"),
    i18n("Sudan"),
    i18n("Sweden"),
    i18n("Singapore"),
    i18n("Saint Helena"),
    i18n("Slovenia"),
    i18n("Svalbard and Jan Mayen Islands"),
    i18n("Slovakia"),
    i18n("Sierra Leone"),
    i18n("San Marino"),
    i18n("Senegal"),
    i18n("Somalia"),
    i18n("Suriname"),
    i18n("South Sudan"),
    i18n("Sao Tome and Principe"),
    i18n("El Salvador"),
    i18n("Sint Maarten (Dutch part)"),
    i18n("Syria"),
    i18n("Swaziland"),
    i18n("Turks and Caicos Islands"),
    i18n("Chad"),
    i18n("French Southern Territories"),
    i18n("Togo"),
    i18n("Thailand"),
    i18n("Tajikistan"),
    i18n("Tokelau"),
    i18n("Timor-Leste"),
    i18n("Turkmenistan"),
    i18n("Tunisia"),
    i18n("Tonga"),
    i18n("Turkey"),
    i18n("Trinidad and Tobago"),
    i18n("Tuvalu"),
    i18n("Taiwan"),
    i18n("Tanzania"),
    i18n("Ukraine"),
    i18n("Uganda"),
    i18n("United States Minor Outlying Islands"),
    i18n("United States"),
    i18n("Uruguay"),
    i18n("Uzbekistan"),
    i18n("Vatican"),
    i18n("Saint Vincent and the Grenadines"),
    i18n("Venezuela"),
    i18n("Virgin Islands (British)"),
    i18n("Virgin Islands (U.S.)"),
    i18n("Vietnam"),
    i18n("Vanuatu"),
    i18n("Wallis and Futuna Islands"),
    i18n("Samoa"),
    i18n("Yemen"),
    i18n("Mayotte"),
    i18n("South Africa"),
    i18n("Zambia"),
    i18n("Zimbabwe")
];
var g_salutations = [
    i18n('Miss'),
    i18n('Ms'),
    i18n('Mrs'),
    i18n('Mr'),
    i18n('Dr'),
    i18n('Prof')
];

var g_currentAudio = '';
var g_emails = [];
var g_currentSelectedDetailField = '';
var g_currentNavMenuState = false;
var g_currentBarInfo;

var g_audioPlayer = null;
var g_photo = null;

var g_captuvoConnected = false;
var g_captuvoBadgeScan = false;

var g_captuvoDlg = null;

var g_languages = null;
var g_currentLanguage = null;

var g_deletionPromptShown = false;

/**
 * Functions
 */
function i18n(text) {
    if (g_languages && g_languages.definitions[text] && g_languages.definitions[text][g_currentLanguage]) {
        value = g_languages.definitions[text][g_currentLanguage];
    } else {
        value = text;
    }

    return value;
}

function setLanguage(language) {
    if (g_languages && g_languages.descriptions[language]) {
        g_currentLanguage = language;
    } else {
        g_currentLanguage = 'en_US';
    }

    $('.i18n').each(function () {
        var attribute = this.getAttribute('data-i18n-attribute'),
            original = this.getAttribute('data-i18n-original'),
            current = attribute ? this.getAttribute(attribute) : $(this).text();

        if (!original) {
            this.setAttribute('data-i18n-original', current);

            original = current;
        }

        var value = i18n(original);

        if (attribute) {
            this.setAttribute(attribute, value);
        } else {
            $(this).text(value);
        }
    });

    localStorage.setItem('currentLanguage', language);

    initLanguage();

    myApp = new Framework7({
        animateNavBackIcon: true,
        swipeBackPage: false,
        modalButtonOk: i18n('YES'),
        modalButtonCancel: i18n('NO')
    });

    myApp1 = new Framework7({
        animateNavBackIcon: true,
        swipeBackPage: false,
        modalButtonOk: i18n('NO'),
        modalButtonCancel: i18n('YES')
    });

    clearApp = new Framework7({
        animateNavBackIcon: true,
        swipeBackPage: false,
        modalButtonOk: i18n('OK'),
        modalButtonCancel: i18n('Cancel')
    });
}

function initLanguage() {
    if (g_languages && Object.keys(g_languages.descriptions).length > 1) {
        $('.languages').empty();

        for (var i in g_languages.descriptions) {
            var li = $('<li>')
                .append($('<a>')
                    .attr('href', '#')
                    .attr('data-language', i)
                    .text(g_languages.descriptions[i])
                    .click(function (e) {
                        e.preventDefault();

                        setLanguage(this.getAttribute('data-language'));
                    })
                );

            if (g_currentLanguage === i) {
                li.addClass('selected');
            }

            $('.languages').append(li);
        }

        $('.change-language, .languages').show();
    } else {
        $('.change-language, .languages').hide();
    }
}

function syncLanguages() {
    var username = localStorage.getItem('username');

    $$.ajax({
        url: SERVER_URL + 'get-languages.php?username=' + username.replace(/['"]+/g, ''),
        type: 'GET',
        dataType: 'json',
        error: errorFunctionNoAlert,
        success: function (results) {
            g_languages = results;

            localStorage.setItem('languages', JSON.stringify(g_languages));

            setLanguage(g_currentLanguage);
        }
    });
}

function errorFunction() {
    myApp.hideIndicator();

    myApp.alert(i18n('Please check your server status'), i18n('No connection Found!'));
}

function errorFunctionNoAlert(xhr, textStatus, errorThrown) {
    myApp.hideIndicator();

    console.warn(xhr);
    console.warn(textStatus);
    console.warn(errorThrown);
}

function errorFunctionLog(xhr, textStatus, errorThrown) {
    console.warn(xhr);
    console.warn(textStatus);
    console.warn(errorThrown);
}

function panelEmailAllData() {
    var admin_email = JSON.parse(localStorage.getItem("adminemail"));

    if (admin_email) {
        $$('#admin-email').val(admin_email);

        initNavTitle();
    }

    mainView.router.load({
        pageName: 'email-all-data'
    });

    myApp.closePanel();
}

function panelEditTradeshow() {
    var url = SERVER_URL + "index.php";

    window.open(url, '_system', 'location=no');

    myApp.closePanel();
}

function panelSupport() {
    var url = 'http://www.salestratus.com/faq/';

    window.open(url, '_system', 'location=no');

    myApp.closePanel();
}

function panelPrivacy() {
    var url = 'http://www.salestratus.com/privacy/';

    window.open(url, '_system', 'location=no');

    myApp.closePanel();
}

function logout() {
    $.ajax({
        url: SERVER_URL + "user-update.php",
        data: "act=logout&username=" + g_username,
        method: 'POST',
        dataType: 'json',
        error: errorFunctionLog,
        success: function (result) {
            if (result && result.status == "ok") {
                var users = JSON.parse(localStorage.getItem('users')) || [];

                for (var i = 0; i < users.length; i++) {
                    var user = users[i];

                    if (user.username == g_username) {
                        users.splice(i, 1);
                    }
                }

                localStorage.setItem("users", JSON.stringify(users));
            }
        }
    });

    localStorage.setItem("user_status", JSON.stringify("logout"));
    localStorage.setItem("intervalChecks", false);
    // localStorage.clear();

    $$('#user').val("");
    $$('#password').val("");

    superMainView.router.load({
        pageName: 'login'
    });

    myApp.closePanel();

    if (caller.id == 'panel-log-out') {
        mainView.router.load({
            pageName: 'trades'
        });
    }
}

function panelLogout() {
    var caller = this;

    myApp.confirm(
        i18n('Connection needed to log in again.'),
        i18n('Are you sure you want to logout?'),
        function () {
            logout();
        },
        function () {
            myApp.closePanel();
        });
}

function loginOnEnter(e) {
    if (e.keyCode == 13) {
        login();

        return false;
    }
};

//====login process====//
function login() {
    g_username = $$('#user').val().toLowerCase();
    g_password = $$('#password').val();

    if (!g_username || !g_password) {
        myApp.alert(i18n('Please enter username or password'), i18n('Input error!'));

        return;
    }

    // if (localStorage) {
    //     var i = 0;
    //     try {
    //         // Test up to 10 MB
    //         for (i = 250; i <= 10000; i += 250) {
    //             localStorage.setItem('test', new Array((i * 1024) + 1).join('a'));
    //         }
    //     } catch (e) {
    //         localStorage.removeItem('test');
    //         localStorage.setItem('size', i - 250);
    //         console.log('Local storage max size: ' + i + 'kb');
    //     }
    // }

    var users = JSON.parse(localStorage.getItem('users')) || [];

    for (var i = 0; i < users.length; i++) {
        var user = users[i];

        if (user.username == g_username &&
            user.password == g_password) {
            localStorage.setItem("username", JSON.stringify(g_username));

            loginProcess();

            return;
        }
    }

    myApp.showIndicator();

    $$.ajax({
        url: SERVER_URL + "get-user.php",
        data: {
            username: g_username,
            password: g_password
        },
        type: "POST",
        dataType: "json",
        error: errorFunction,
        success: function (result) {
            var error = null;

            if (result.status == "fail") {
                error = i18n("Login was unsuccessful, please verify username and password and try again");
            } else if (result.status == "used") {
                error = i18n("Login was unsuccessful, Username/Password already used!");
            }

            if (error) {
                myApp.hideIndicator();

                myApp.alert(error, i18n("Login Failed!"));

                return;
            }

            var user = {
                username: g_username,
                //password: g_password
            };

            var users = JSON.parse(localStorage.getItem('users')) || [];

            users.push(user);

            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("user_status", JSON.stringify("login"));
            localStorage.setItem("username", JSON.stringify(g_username));

            g_profileFields = [];
            g_profileFieldsAllTrade = [];
            g_currentTradeshowName = '';
            g_currentCompanyName = '';
            g_syncCheck = false;
            g_skipLogicEnabled = false;
            g_currentCreateTime = '';
            g_QAs = [];
            g_tradeshows = '';
            g_emails = [];
            g_currentBizUrl = '';
            g_currentAudio = '';
            g_photo = '';

            g_userId = result.status.id;

            var userids = JSON.parse(localStorage.getItem("userid")) || [];

            for (var i = 0; i < userids.length; i++) {
                if (userids[i].username == g_username) {
                    userids.splice(i, 1);

                    break;
                }
            }

            userids.push({
                username: g_username,
                userid: g_userId
            });

            localStorage.setItem("userid", JSON.stringify(userids));

            g_adminId = result.status.admin_acc_id;
            var brandingImageGlobalUrl = result.status.branding_image ? SERVER_URL + result.status.branding_image : false;
            var idleTime = result.status.branding_idle_time;

            $.ajax({
                url: SERVER_URL + "get-company-detail.php",
                data: "act=getCompanyName&id=" + g_adminId,
                method: 'POST',
                dataType: 'json',
                error: errorFunction,
                success: function (result) {
                    g_currentTradeshowName = result[0].tradeshow_name;
                    g_currentCompanyName = result[0].company;
                    g_skipLogicEnabled = result[0].skip_logic_enabled;
                    g_syncCheck = result[0].sync_check;

                    localStorage.setItem("tradeshowname", JSON.stringify(g_currentTradeshowName));
                    localStorage.setItem("adminemail", JSON.stringify(result[0].account_manager_email));


                    if (brandingImageGlobalUrl) {
                        saveBrandingImage(brandingImageGlobalUrl, idleTime);
                    }

                    var companynames = JSON.parse(localStorage.getItem("companynames")) || [];

                    for (var i = 0; i < companynames.length; i++) {
                        if (companynames[i].username == g_username) {
                            companynames.splice(i, 1);

                            break;
                        }
                    }

                    companynames.push({
                        username: g_username,
                        companyname: g_currentCompanyName,
                        skip_logic_enabled: g_skipLogicEnabled,
                        syncCheck: g_syncCheck,
                        lastCheck: Math.floor(new Date().getTime() / 1000)
                    });

                    localStorage.setItem("companynames", JSON.stringify(companynames));

                    initNavTitle();

                    superMainView.router.load({
                        pageName: 'main',
                    });

                    // cordova.plugins.Keyboard.disableScroll(false);

                    if (brandingImageGlobalUrl) {
                        setTimeout(function() {
                            showBrandingImage()
                        }, 500);
                    }
                }
            });

            $$.ajax({
                url: SERVER_URL + "get-tradeshows.php?userid=" + g_userId,
                type: "GET",
                dataType: "json",
                error: errorFunction,
                success: function (results) {
                    g_tradeshows = results;

                    var tradeshow = {
                        username: g_username,
                        tradeshow: JSON.stringify(results)
                    };



                    var tradeshows = JSON.parse(localStorage.getItem("tradeshows")) || [];

                    for (var i = 0; i < tradeshows.length; i++) {
                        if (tradeshows[i].username == g_username) {
                            tradeshows.splice(i, 1);

                            break;
                        }
                    }

                    updateTradeshowImage(tradeshow);

                    tradeshows.push(tradeshow);

                    localStorage.setItem("tradeshows", JSON.stringify(tradeshows));

                    initTradeShowList();
                    showChart();
                }
            });

            $$.ajax({
                url: SERVER_URL + "get-profile.php?userid=" + g_userId,
                type: "GET",
                dataType: "json",
                error: errorFunction,
                success: function (results) {
                    if (results.status == "Success") {
                        g_profileFieldsAllTrade = results.data;

                        var profilefields = JSON.parse(localStorage.getItem("profilefields")) || [];

                        for (var i = 0; i < profilefields.length; i++) {
                            if (profilefields[i].username == g_username) {
                                profilefields.splice(i, 1);

                                break;
                            }
                        }

                        profilefields.push({
                            username: g_username,
                            data: g_profileFieldsAllTrade
                        });

                        localStorage.setItem("profilefields", JSON.stringify(profilefields));
                    }
                }
            });

            $$.ajax({
                url: SERVER_URL + "question-update.php?userid=" + g_userId + "&answers=1",
                type: "GET",
                dataType: "json",
                error: errorFunction,
                success: function (results) {
                    myApp.hideIndicator();

                    g_QAs = JSON.parse(localStorage.getItem("questions")) || [];

                    for (var i = 0; i < results.length; i++) {
                        for (var j = 0; j < g_QAs.length; j++) {
                            if (g_QAs[j].tradeshow_id == results[i].tradeshow_id) {
                                g_QAs.splice(j, 1);

                                break;
                            }
                        }
                    }

                    for (var i = 0; i < results.length; i++) {
                        var tmp = results[i];

                        g_QAs.push(tmp);
                    }
                    ;

                    localStorage.setItem("questions", JSON.stringify(g_QAs));
                }
            });
        }
    });
}

function loginProcess() {
    localStorage.setItem("user_status", JSON.stringify("login"));

    g_currentTradeshowName = JSON.parse(localStorage.getItem("tradeshowname")) || '';
    g_currentCreateTime = "";
    g_currentCompanyName = "";
    g_syncCheck = false;
    g_profileFields = [];
    g_profileFieldsAllTrade = [];
    g_QAs = [];
    g_emails = [];
    g_currentBizUrl = '';
    g_currentAudio = '';
    g_photo = '';
    g_username = JSON.parse(localStorage.getItem("username")) || '';

    var tmpdata = JSON.parse(localStorage.getItem("userid")) || [];

    for (var i = 0; i < tmpdata.length; i++) {
        if (tmpdata[i].username == g_username) {
            g_userId = tmpdata[i].userid;
        }
    }

    tmpdata = JSON.parse(localStorage.getItem("companynames")) || [];

    for (var i = 0; i < tmpdata.length; i++) {
        if (tmpdata[i].username == g_username) {
            g_currentCompanyName = tmpdata[i].companyname;
            g_skipLogicEnabled = tmpdata[i].skip_logic_enabled;
            g_syncCheck = tmpdata[i].syncCheck;

            initNavTitle();
        }
    }

    tmpdata = JSON.parse(localStorage.getItem("tradeshows")) || [];

    for (var i = 0; i < tmpdata.length; i++) {
        if (tmpdata[i].username == g_username) {
            g_tradeshows = JSON.parse(tmpdata[i].tradeshow);

            break;
        }
    }

    initTradeShowList();

    tmpdata = JSON.parse(localStorage.getItem("profilefields")) || [];

    for (var i = 0; i < tmpdata.length; i++) {
        if (tmpdata[i].username == g_username) {
            g_profileFieldsAllTrade = tmpdata[i].data;

            break;
        }
    }

    g_QAs = JSON.parse(localStorage.getItem("questions")) || [];

    superMainView.router.load({
        pageName: 'main'
    });

    // cordova.plugins.Keyboard.disableScroll(false);
    showChart();
}

function showChart() {
    $("#total-leads")
        .empty()
        .append(g_tradeshows ? g_tradeshows.total_leads_count : 0);

    var charts = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        exporting: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: i18n('Count : <b>{point.y}</b>'),
        },
        plotOptions: {
            pie: {
                allowPointSelect: false,
                cursor: null,
                dataLabels: {
                    enabled: false,
                    format: '',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Count',
            colorByPoint: true,
            data: []
        }]
    };

    var tmpdata = JSON.parse(localStorage.getItem("tradeshows"));

    if (tmpdata == null)
        return;

    if (g_tradeshows) {
        var tradeshows = g_tradeshows.tradeshows;

        for (var i = 0; i < tradeshows.length; i++) {
            var trade = tradeshows[i];
            var strColor = '';

            if (i % 3 == 0)
                strColor = '#51aaff';
            else if (i % 3 == 1)
                strColor = '#b590d4';
            else if (i % 3 == 2)
                strColor = '#2cceb6';

            if (i == tradeshows.length - 1 && i % 3 == 0)
                strColor = '#b590d4';

            charts.series[0].data.push({
                name: trade.name,
                y: trade.leads_count,
                color: strColor
            });
        }

        if (tradeshows.length == 0)
            $('#piechart').html('<label style="width:100%; text-align:center; margin-top:90px;">' + i18n('Select Event Below') + '</label>');
        else
            $('#piechart').highcharts(charts);
    }
}

function initNavTitle() {
    $("#navTitle1").empty().append(g_currentCompanyName);
}

function showResult(field_id, livesearch_id, options) {
    var field = $('#' + field_id);
    var livesearch = $('#' + livesearch_id);
    var str = field.val();

    livesearch.empty();

    if (str.length > 0) {
        var filter_str = str;
        var filtered = options.filter(function (value) {
            return value.toLowerCase().indexOf(filter_str.toLowerCase()) >= 0;
        });

        for (var i = 0; i < filtered.length; i++) {
            var label = $('<label/>')
                .data('field-id', field_id)
                .data('livesearch-id', livesearch_id)
                .text(filtered[i])
                .click(function () {
                    var field_id = $(this).data('field-id');
                    var livesearch_id = $(this).data('livesearch-id');

                    $('#' + field_id).val($(this).text());
                    $('#' + livesearch_id).empty();
                });

            livesearch.append(label);

            if (i != filtered.length - 1) {
                livesearch.append('<br/>');
            }
        }
    }
}

function initProfileDetails() {
    $('#detaillistfields').empty();
    $('#profiledetailForm').empty();
    $('.navbar').css('opacity', 1);

    for (var i = 0; i < g_profileFields.length; i++) {
        var field_name = g_profileFields[i],
            hrClass = '',
            liClass = '',
            l_isFieldHidden = isFieldHidden(field_name);

        var str = '';

        if (l_isFieldHidden) {
            hrClass = 'hidden';
            liClass = 'hidden';
        }

        str += '  <hr class="' + hrClass + '">';
        str += '  <li class="' + liClass + '">';
        str += '      <div class="item-content">';
        str += '        <div class="item-inner" style="display:flex;">';
        str += '          <div style="width:80%;margin-left:15px;">';
        str += '            <div class="item-after" style="color: #0069D2;" id="detailfield' + i + '" data-name-raw="' + getFieldName(field_name) + '">' + getFieldName(field_name) + (isFieldMandatory(field_name) ? ' *' : '') + '</div>';

        if ("Country" == g_profileFields[i] || "Salutation" == g_profileFields[i]) {
            var filter = '';

            if ('Country' == g_profileFields[i]) {
                filter = 'g_countries';
            } else {
                filter = 'g_salutations';
            }

            str += '            <div class="item-title"> <input onkeyup="showResult(\'detailfieldvalue' + i + '\', \'livesearch' + i + '\', ' + filter + ')" type="text" id="detailfieldvalue' + i + '" placeholder="' + i18n('Please enter detail') + ' (' + i18n(field_name) + ')' + '" class="form-control txt_detaillistfields" style="border-width:0px;box-shadow:none;font-size:1em;color:black" ></div>';
            str += '<div id="livesearch' + i + '" style="padding-left:10px"></div>';
        } else {
            str += '            <div class="item-title"> <input type="text" id="detailfieldvalue' + i + '" placeholder="' + i18n('Please enter detail') + ' (' + i18n(field_name) + ')' + '" class="form-control txt_detaillistfields" style="border-width:0px;box-shadow:none;font-size:1em;color:black"></div>';
        }

        str += '          </div>';
        str += '          <div class="btn-profiledetailfield" id="' + i + '" style="text-align:center;width:20%">';
        str += '              <i class="fa fa-exchange"></i>';
        str += '          </div>';
        str += '        </div>';
        str += '      </div>';
        str += '  </li>';

        $$('#detaillistfields').append(str);
    }
}

function initProfileDetailsSelf() {
    var selfTest = false;
    $('#profiledetailForm').empty();
    $('#detaillistfields').empty();

    for (var i = 0; i < g_profileFields.length; i++) {
        var field_name = g_profileFields[i];

        var str = '';
        var val = selfTest ? field_name + '@test.com' : '';
        var hidden = isFieldHidden(field_name) ? 'hidden' : '';
        var required = isFieldMandatory(field_name) ? '*' : '';

        str += '  <div id="' + field_name + '" class="details-input-wrapper ' + hidden + '">';
        str += '  <p><span class="i18n" id="detailfield' + i + '" data-name-raw="' + field_name + '">' + i18n(field_name) + '</span>' + required + ':</p>';
        str += '      <div class="details-input">' + val + '</div>';
        str += '      <input type="hidden" id="detailfieldvalue' + i + '" ' + val + ' ' + (required ? 'required' : '') + ' value="' + val + '">';
        str += '  </div>';

        $$('#profiledetailForm').append(str);
    }
}

function barcodeScanDirect(doSync, role = false) {
    g_groupRole = role;
    g_captuvoBadgeScan = doSync;
    if (g_captuvoConnected == false) {
        $('.panel-collapse').collapse("hide");
        $('#collapseOne').collapse("show");

        if (g_captuvoBadgeScan) {
            // mainView.router.load({
            //     pageName: 'profile-details'
            // });
            g_currentStatus = "manually";
            g_scanType = role ? "group scan" : "badge code scan";
        } else {
            g_currentStatus = "quick_scan";
            g_scanType = role ? "group quick scan" : "quick scan";
        }

        initFields();

        barcodeScan();

        if (g_captuvoBadgeScan) {
            setTimeout(() => {
                mainView.router.load({
                    pageName: 'profile-details'
                });
            }, 3000);
            // mainView.router.back();
        }
    } else {
        g_captuvoDlg = myApp.modal({
            title: i18n("Scan Badge Code"),
            text: i18n("You are connected with Honeywell Captuvo device. Please scan the code with your captuvo device."),
            buttons: [{
                text: i18n('CANCEL'),
                onClick: function () {
                    myApp.closeModal(g_captuvoDlg);
                }
            }]
        });
    }
}

function processAfterScanBarcode(result) {

    if (result.format != "") {
        var text = "";
        if (typeof result === "string") {
            var text = result.replace(/\n/g, "\t");
        } else if (result.text != "") {
            var text = result.text.replace(/\n/g, "\t");
        }

        g_currentBarInfo = text;

        $("#barcode_result").val(g_currentBarInfo);

        if (g_currentStatus !== 'quick_scan') {
            processBarCode();
        } else {
            processBarCode(false);
            saveLead();
        }
    }
}

function barcodeScan() {
    var email = $$('#detailfieldvalue0').val();
    var first_name = $$('#detailfieldvalue1').val();
    var last_name = $$('#detailfieldvalue2').val();
    var company = $$('#detailfieldvalue3').val();
    var address = $$('#detailfieldvalue4').val();
    var phone = $$('#detailfieldvalue5').val();
    var mobile = $$('#detailfieldvalue6').val();
    var fax = $$('#detailfieldvalue7').val();
    var job = $$('#detailfieldvalue8').val();
    var web = $$('#detailfieldvalue9').val();

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            processAfterScanBarcode(result);
        },
        function (error) {
            g_currentBarInfo = i18n("Scanning failed!");

            $("#barcode_result").val(g_currentBarInfo);
        }, {
            formats: 'QR_CODE,DATA_MATRIX,UPC_E,UPC_A,EAN_8,EAN_13,CODE_128,CODE_39,ITF,PDF_417'
        }
    );
}

function barcodeScanSelf(preferFrontCamera) {
    myApp.showIndicator();
    clearTimeout(g_selfScanTimeout);

    var scan = cordova.plugins.barcodeScanner.scan(
        function (result) {
            myApp.hideIndicator();
            processAfterScanBarcode(result);

            $("#barcode_result").val(g_currentBarInfo);

            $('#skipSelfScan').parents('.self-step').removeClass('current');
            $('#skipSelfScan').parents('.self-step').next('.self-step').addClass('current');
        },
        function (error) {
            myApp.hideIndicator();
            g_currentBarInfo = i18n("Scanning failed!");

            $("#barcode_result").val(g_currentBarInfo);
        }, {
            preferFrontCamera : preferFrontCamera, // iOS and Android
            showFlipCameraButton : true, // iOS and Android
            formats: 'QR_CODE,DATA_MATRIX,UPC_E,UPC_A,EAN_8,EAN_13,CODE_128,CODE_39,ITF,PDF_417'
        }
    );

    if (typeof scan === 'undefined') {
        myApp.hideIndicator();
    }
}

function addGroupMember(quick, groupID, groupRole) {
    if (groupRole === 'leader') {
        g_groupID += 1;
    }
    if (groupID !== false) g_groupID = groupID;
    g_groupRole = groupRole;

    barcodeScanDirect(quick, groupRole);
}

function checkNetworkState() {
    var networkState = navigator.connection.type;
}

function decodeASCIICharacter(string) {
    return string.replace(/ascii:(\d+)/ig, function (matches) {
        return String.fromCharCode(matches.replace(/^ascii:/, ''));
    });
}

function processBarCode(full_process = true) {

    myApp.showIndicator();

    /**
     * QR decryption and fields populating.
     */

    // g_currentBarInfo = '';
    g_onlineStatus = 'online';
    var message = false;
    var current_tradeshow = false;
    var token = false;
    var APIConnection = false;
    for (var i = g_tradeshows.tradeshows.length - 1; i >= 0; i--) {
        if (g_tradeshows.tradeshows[i].id == g_tradeshowId) {
            current_tradeshow = g_tradeshows.tradeshows[i];
            token = current_tradeshow.token;
            APIConnection = g_tradeshows.tradeshows[i].APIConnection;
        }
    }

    // marker for an encrypted message
    if ((typeof g_currentBarInfo != "undefined") && g_currentBarInfo.includes('{"ct":"')) {
        var message_cont = g_currentBarInfo.split("|");
        if (typeof message_cont[1] != "undefined") {
            message = JSON.parse(message_cont[1]);
        }
    }

    if (current_tradeshow && token && APIConnection && message) {
        try {
            var decrypted = JSON.parse(CryptoJS.AES.decrypt(JSON.stringify(message), token, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));
            decrypted = JSON.parse(decrypted);
        }
        catch(error) {
            console.error("Token mismatch.");
        }

        for (var d in decrypted) {

            for (var j in APIConnection.fields) {

                var source = APIConnection.fields[j].source.toLowerCase();
                var destination = APIConnection.fields[j].destination.toLowerCase();

                if (source == d.toLowerCase()) {

                    for (var k = 0; $('#detailfield' + k).length; k++) {
                        var current_field = $('#detailfield' + k).text();

                        if (current_field.toLowerCase().replace(' *', '') == destination) {
                            var current_value = $('#detailfieldvalue' + k);

                            if (!current_value.val())
                                current_value.val(decrypted[d]);
                            break;
                        }

                    }

                }

            }

        }

    } else {
        /**
         * We attempt offline decode first.
         */
        for (var i = g_tradeshows.tradeshows.length - 1; i >= 0; i--) {
            if (g_tradeshows.tradeshows[i].id == g_tradeshowId) {

                var APIConnection = g_tradeshows.tradeshows[i].APIConnection;
                var result = g_currentBarInfo;

                if (APIConnection && !APIConnection.url) {
                    if (APIConnection.start_delimiter) {
                        var start_delimiter = decodeASCIICharacter(APIConnection.start_delimiter);

                        var pattern = new RegExp('^' + start_delimiter);

                        result = result.replace(pattern, '');
                    }

                    if (APIConnection.end_delimiter) {
                        var end_delimiter = decodeASCIICharacter(APIConnection.end_delimiter);

                        var pattern = new RegExp(start_delimiter + '$');

                        result = result.replace(pattern, '');
                    }

                    var data_separator = decodeASCIICharacter(APIConnection.data_separator);

                    var parsed_result = result.split(data_separator);

                    for (var j in APIConnection.fields) {
                        var field = APIConnection.fields[j];
                        var source = field.source;

                        if (parsed_result[source]) {
                            var destination = field.destination;

                            for (var k = 0; $('#detailfield' + k).length; k++) {
                                var current_field = $('#detailfield' + k).text();

                                if (current_field == destination) {
                                    var current_value = $('#detailfieldvalue' + k);

                                    if (!current_value.val()) {
                                        current_value.val(parsed_result[source]);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }

                break;
            }
        }
    }

    if (!full_process) {
        myApp.hideIndicator();
        return;
    }

    $$.ajax({
        url: SERVER_URL + "barcode.php",
        data: {
            code: g_currentBarInfo,
            tradeshow_id: g_tradeshowId
        },
        type: "GET",
        dataType: "json",
        error: errorFunctionNoAlert,
        success: function (results) {
            g_currentStatus = 'manually';
            g_onlineStatus = 'online';

            myApp.hideIndicator();

            for (var i = 0; ; i++) {
                var field = $('#detailfield' + i);
                var value = $('#detailfieldvalue' + i);
                var selfReg_input = $('#detailfield' + i).closest('div').find('.details-input');

                if (field.length && value.length) {
                    var fieldId = getFieldByPosition(i);

                    if (!value.val() && results[fieldId]) {
                        value.val(results[fieldId]);
                        if (selfReg_input) {
                            $$(selfReg_input).text(results[fieldId]);
                        }
                    }
                } else {
                    break;
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            myApp.hideIndicator();

            if (g_currentStatus == 'bizcard') {
                g_currentStatus = "";
                myApp1.confirm(
                    i18n('Internet connection issue. Do you want to continue offline & process once connected?'),
                    i18n('No connection Found!'),
                    function () {
                        mainView.router.load({
                            pageName: 'select-mode'
                        });
                        myApp.closePanel();
                    },
                    function () {
                        g_onlineStatus = 'offline';
                        // saveLead();
                        // myApp.closePanel();
                    }
                );
            } else {
                myApp1.confirm(
                    i18n('Internet connection issue. Do you want to continue offline & process once connected?'),
                    i18n('No connection Found!'),
                    function () {
                        if (g_selfMode) {
                            initSelfreg(g_tradeshowId);
                        } else {
                            mainView.router.load({
                                pageName: 'select-mode'
                            });
                            myApp.closePanel();
                        }
                    },
                    function () {
                        g_onlineStatus = 'offline';
                        // saveLead();
                        // myApp.closePanel();
                    }
                );
            }
        }
    });
}

// renames the captured image file to be timebased
// movess the image file to our app own folder
function movePhoto(imageURI) {
    window.resolveLocalFileSystemURL(
        imageURI,
        function (entry) {
            var d = new Date();
            var n = d.getTime();

            //new file name
            var newFileName = n + ".jpg";
            var myFolderApp = g_imageFolder

            window.requestFileSystem(window.TEMPORARY, 16 * 1024 * 1024, function (fileSys) {
                fileSys.root.getDirectory(myFolderApp, {
                        create: true
                    },
                    function (directory) {
                        entry.moveTo(directory, newFileName, function (new_entry) {
                            path = new_entry.fullPath;
                            url = new_entry.toURL();

                            g_currentBizUrl = url;

                            loadImage(url);

                            // if we are online immedietly start ocr once the user capture an image
                            if ('onLine' in navigator && navigator.onLine) {
                                g_currentOcrStatus = ocrStatus.INPROGRESS;
                                uploadImage(g_currentBizUrl);
                            } else {
                                g_currentOcrStatus = ocrStatus.TODO;
                            }
                        }, resOnError);
                    }, resOnError);
            }, resOnError);
        }, resOnError);
}

function writeFile(fileEntry, img) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {

        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

        // If data object is not passed in,
        // create a new Blob instead.

        var dataObj = new Blob([img], { type: 'image/jpeg' });

        fileWriter.write(dataObj);
    });
}

function resOnError(error) {
    myApp.alert(error.code + ':' + error.message, i18n('move error'));
}

//=============capture audio
function captureAudio() {
    navigator.device.capture.captureAudio(
        function (mediaFiles) {
            for (var i = 0, len = mediaFiles.length; i < mediaFiles.length; i++) {
                g_currentAudio = mediaFiles[i];
            }

            var icon = document.getElementById("btn-capture-audio");

            if (icon && icon.style) {
                icon.style.background = "#c7c7c7";
            }
        },
        function (error) {
            var msg = i18n('No audio notes have been saved');

            myApp.alert(msg, i18n('Uh oh!'));
        }, {
            limit: 1
        }
    );
}

function playAudio() {
    if (!g_audioPlayer) {
        g_audioPlayer = new Audio();

        g_audioPlayer.addEventListener('play', function (e) {
            $('#btn-play-audio i').removeClass('fa-play').addClass('fa-pause');
        });

        g_audioPlayer.addEventListener('error', function (e) {
            //myApp.alert('There was an error loading the audio file', 'Audio Player');
            myApp.alert(i18n('You need to save the lead before audio replay'), i18n('Ooops!'));
        });

        var onEnded = function (e) {
            $('#btn-play-audio i').addClass('fa-play').removeClass('fa-pause');
        };

        g_audioPlayer.addEventListener('pause', onEnded);
        g_audioPlayer.addEventListener('ended', onEnded);
    }

    if (g_audioPlayer.paused) {
        if (g_currentAudio != g_audioPlayer.src) {
            g_audioPlayer.src = g_currentAudio;
        }

        g_audioPlayer.play();
    } else {
        g_audioPlayer.pause();
    }
}

//========
function selectTradeShow(idx) {
    g_tradeshowId = idx;
    g_selfMode = false;
    g_profileFields = [];

    for (var i = 0; i < g_profileFieldsAllTrade.length; i++) {
        if (g_profileFieldsAllTrade[i].tradeshow_id == g_tradeshowId) {
            for (var j = 0; j < g_profileFieldsAllTrade[i].profile.length; j++) {
                g_profileFields.push(g_profileFieldsAllTrade[i].profile[j].field_name);
            }
        }
    }

    for (var i = g_tradeshows.tradeshows.length - 1; i >= 0; i--) {
        if (g_tradeshows.tradeshows[i].id == g_tradeshowId) {
            if (g_tradeshows.tradeshows[i].selfreg_enabled === 1) {
                initSelfreg(g_tradeshowId);
                return;
            }
        }
    }

    initProfileDetails();

    initLeadsList();

    $("#tradeshow-leads").empty();

    for (var i = g_tradeshows.tradeshows.length - 1; i >= 0; i--) {
        if (g_tradeshows.tradeshows[i].id == g_tradeshowId) {
            g_currentTradeshowName = g_tradeshows.tradeshows[i].name;
            g_currentTradeshow = g_tradeshows.tradeshows[i];

            $("#tradeshow-leads").append(g_tradeshows.tradeshows[i].leads_count);
            $("#navTitle").html(g_tradeshows.tradeshows[i].name);
            $("#navTitle").data("tradeshow_id", g_tradeshowId);

            $('#quick-scan-container').toggleClass('enabled', !!g_currentTradeshow.quick_scan_enabled);
            $('#group-scan-container').toggleClass('enabled', !!g_currentTradeshow.group_scan_enabled);

            updateEmailButton();

            break;
        }
    }

    mainView.router.load({
        pageName: 'home'
    });
}

function showLinkedUsers() {
    for (var i = g_tradeshows.tradeshows.length - 1; i >= 0; i--) {
        if (g_tradeshows.tradeshows[i].id == g_tradeshowId) {
            g_currentTradeshowName = g_tradeshows.tradeshows[i].name;
            g_currentTradeshow = g_tradeshows.tradeshows[i];

            $("#navTitleLinked").html(g_tradeshows.tradeshows[i].name);
            $("#navTitleLinked").data("tradeshow_id", g_tradeshowId);

            break;
        }
    }

    initUserList();

    myApp.closePanel();

    mainView.router.load({
        pageName: 'linked-users'
    });
}

function initSelfreg(idx) {
    g_tradeshowId = idx;

    showSelfregImages();

    $('.navbar').css('opacity', 0);
    mainView.router.load({
        pageName: 'self'
    });

    initProfileDetailsSelf();

    $$('.initial-section').removeClass('hidden');
    $$('.qa_list').remove();
    $$('.details-section').removeClass('current');
    $$('#quickNote').val('');
    $$('.end-section').addClass('hidden');

    $("#navTitle").data("tradeshow_id", g_tradeshowId);

    g_selfMode = true;
    g_currentStatus = "manually";
    g_skipLogicEnabled = true;
    g_QAs = JSON.parse(localStorage.getItem("questions")) || [];
    printQuestions(null, null, null, true);
    $('#note_text_self').val('');
}

function initTradeShowList() {
    $('#tradeshowlist').empty();
    $('.navbar').css('opacity', 1);

    var tmpdata = JSON.parse(localStorage.getItem("tradeshows"));

    if (tmpdata == null)
        return;

    $("#total-leads").empty().append(g_tradeshows ? g_tradeshows.total_leads_count : 0);

    if (g_tradeshows) {
        var tradeshows = g_tradeshows.tradeshows;

        for (var i = tradeshows.length - 1; i >= 0; i--) {
            var trade = tradeshows[i];
            var str = '';

            str += '<li class="swipeout" id="' + i + '" onclick="selectTradeShow(' + trade.id + ')">';
            str += '    <div class="swipeout-content">';
            str += '        <div class="item-inner">';
            str += '            <div class="item-title-row" style="margin: 8px;width:85%">';
            str += '                <div class="item-title" style="color: #0069d2;">' + trade.name + '</div>';
            str += '                <div class="item-after status-lbl"><p style="margin:0; padding-left:0;">' + trade.start_date + '</p>&nbsp;>&nbsp;<p style="margin:0;"> ' + trade.end_date + '</p></div>';
            str += '            </div>';
            str += '            <div class="item-subtitle" style="width:10%">';
            str += '                    <i class="fa  fa-chevron-circle-right fa-2x" id="icon_select' + i + '" style="color:#0069D2"></i>';
            str += '            </div>';
            str += '        </div>';
            str += '    </div>';

            str += '    <div class="swipeout-actions-right">';
            str += '    </div>';
            str += '    </a>';

            str += '</li>';

            $$('#tradeshowlist').append(str);
        }
    }

    checkMessages();
}

function initUserList() {
    $('#userlist').empty();

    var contacts = g_currentTradeshow.userContacts;

    if (typeof contacts === 'undefined' || contacts.length === 0) {
        return;
    }

    for (var i = contacts.length - 1; i >= 0; i--) {
        var contact = contacts[i];
        var str = '';

        str += '<li>';
        str += '    <div>';
        str += '        <div class="item-inner">';
        str += '            <div class="item-title-row" style="margin: 8px;width:70%">';
        str += '                <div class="item-title" style="color: #0069d2;">' + contact.first_name + ' ' + contact.last_name + '</div>';
        str += '                <div class="item-after status-lbl"><p style="margin:0;">' + contact.phone + '</p></div>';
        str += '            </div>';
        str += '            <div class="item-subtitle" style="width:30%; text-align: right;">';
        if (contact.phone !== "") {
            str += '                <a onclick="window.location=\'tel:' + contact.phone + '\';"><i class="fa fa-phone fa-2x" id="" style="color:#0069D2; margin-right: 20px;"></i></a>';
            str += '                <a onclick="window.location=\'sms:' + contact.phone + '\';"><i class="fa fa-comments fa-2x" id="" style="color:#0069D;"></i></a>';
        }
        str += '            </div>';
        str += '        </div>';
        str += '    </div>';
        str += '    </a>';

        str += '</li>';

        $$('#userlist').append(str);
    }
}

function initLeadsList() {
    $('.navbar').css('opacity', 1);
    $('#leadslist').empty();

    g_groupID = 0;
    var max_group_id = 0;

    var leads = JSON.parse(localStorage.getItem("leads"));
    if (leads !== null){
        leads = leads.map(function(lead, index) {
            lead.id = index;
            return lead;
        });
        leads.sort(function(a, b) {
            return a[5] - b[5];
        });
    }

    if (leads == null)
        return;

    g_username = JSON.parse(localStorage.getItem("username"));

    for (var i = leads.length - 1; i >= 0; i--) {
        var lead = leads[i];

        if ((lead[0] == g_username) ||
            (lead[0].split(",")[0] == g_username &&
                lead[0].split(",")[1] == g_tradeshowId &&
                (lead[0].split(",").length == 3 || lead[0].split(",").length == 4))) {
            var status = lead[lead.length - 1];

            var tmp_group_id = parseInt(lead[5]) || false;
            var tmp_role = lead[6];
            var tmp_email = "";
            var tmp_status = "";
            var tmp_verify = "";
            var tmp_style = "font-size:20px;color:#0069D2;";

            var txt_email = "";
            var txt_fname = "";
            var txt_lname = "";
            var txt_name = "";
            var txt_company = "";

            var icon_class = "";

            var groupSep = false;
            if (tmp_group_id && g_groupID !== tmp_group_id) {
                groupSep = '<div class="group_separator">';
                groupSep += i18n('Group') + ' ' + tmp_group_id;
                groupSep += '<a class="new_member" href="javascript:addGroupMember(false, ' + tmp_group_id + ', \'member\')"><span>' + i18n('+ new member') + '</span></a>';
                groupSep += '</div>';
                $$('#leadslist').append(groupSep);
                g_groupID = tmp_group_id;
                max_group_id = tmp_group_id >= max_group_id ? tmp_group_id : max_group_id;
            }

            for (var j = 7; j < 15; j++) {
                if (lead[j]) {
                    if (lead[j].Email != null) {
                        txt_email = lead[j].Email;
                    } else if (lead[j]["First Name"] != null) {
                        txt_fname = lead[j]["First Name"];
                    } else if (lead[j]["Last Name"] != null) {
                        txt_lname = lead[j]["Last Name"];
                    } else if (lead[j].Company != null) {
                        txt_company = lead[j].Company;
                    }
                }
            }

            txt_name = txt_fname + " " + txt_lname;

            if (txt_email == "") {
                txt_email = i18n("Undefined Email");
            }

            if (txt_name == " ") {
                txt_name = i18n("Undefined Name");
            }

            if (txt_company == "") {
                txt_company = i18n("Undefined Company");
            }

            var number = i + 1;

            if (status == "todo") {
                icon_class = 'fa fa-refresh';
                tmp_email = i18n("Lead 00000") + number;
                tmp_status = i18n("OCR | To do.");
            } else if (status == "progress") {
                icon_class = 'fa fa-refresh fa-spin';
                tmp_email = i18n("Lead 00000") + number;
                tmp_status = i18n("OCR | In progress.");
            } else if (status == "verify") {
                icon_class = 'fa fa-check';
                tmp_email = txt_email;
                tmp_status = i18n("OCR | Complete.");

                if (g_dWidth < 330) {
                    tmp_verify = "&nbsp " + i18n("Verify ...");
                } else {
                    tmp_verify = "&nbsp " + i18n("Verify data.");
                }

                tmp_style = "font-size:20px;color:#ff9000;";
            } else if (status == "complete" ||
                status == "edited" ||
                status == "complete_manually") {
                icon_class = 'fa fa-refresh';
                tmp_email = txt_email;
                tmp_status = txt_name + ' | ' + txt_company;
            } else if (status == "checkingprocess") {
                icon_class = 'fa fa-refresh fa-spin';
                tmp_email = txt_email;
                tmp_status = txt_name + ' | ' + txt_company;
            } else if (status == "checked") {
                icon_class = 'fa fa-check';
                tmp_email = txt_email;
                tmp_status = txt_name + ' | ' + txt_company;
            }

            if (g_dWidth < 330) {
                if (tmp_status.length > 29) {
                    tmp_status = tmp_status.substring(0, 28) + ' ...';
                }
            } else if (g_dWidth < 420) {
                if (tmp_status.length > 36) {
                    tmp_status = tmp_status.substring(0, 35) + ' ...';
                }
            } else {
                if (tmp_status.length > 66) {
                    tmp_status = tmp_status.substring(0, 65) + ' ...';
                }
            }

            var str = '';

            str += '<li class="swipeout" id="' + i + '">';
            str += '    <div class="swipeout-content">';
            str += '        <div class="item-inner">';
            str += '            <div class="item-title-row" style="margin: 8px;width:65%">';
            if (tmp_role) {
                str += '            <div class="item-role" style="color: #9575CD; text-transform:capitalize;">' + tmp_role + '</div>';
            }
            str += '                <div class="item-title" style="color: #0069d2;">' + tmp_email + '</div>';
            str += '                <div class="item-after status-lbl"><p style="margin:0; padding-left:0;">' + tmp_status + '</p><p style="color:#ff9000;margin:0;"> ' + tmp_verify + '</p></div>';
            str += '            </div>';
            str += '            <div class="item-subtitle" style="width:7%">';
            str += '                    <i class="' + icon_class + '" id="icon_sync' + i + '" style="font-size:20px;color:#0069D2;"></i>';
            str += '            </div>';
            str += '            <div class="item-subtitle" style="width:7%" onclick="editLead(' + lead.id + ')">';
            str += '                    <i class="fa fa-edit" style="' + tmp_style + '" ></i>';
            str += '            </div>';
            str += '        </div>';
            str += '    </div>';
            str += '    <div class="swipeout-actions-right" style="margin-left: -1px; padding-left: 1px;">';
            str += '       <a href="#" class="bg-red swipeout-delete delete" data-confirm="' + i18n('Are you sure want to delete this item?') + '" data-confirm-title="' + i18n('Delete?') + '" >' + i18n('Delete') + '</a>';
            str += '    </div>';
            str += '    </a>';
            str += '</li>';

            $$('#leadslist').append(str);
        }
    }

    g_groupID = max_group_id;

    checkStorageSize();
}

function editLead(i) {
    g_currentLeadid = i;
    g_currentStatus = "update";

    mainView.router.load({
        pageName: 'profile-details'
    });


    setFields(g_currentLeadid);
}

function delLead(i) {
    g_currentLeadid = i;

    var leads = JSON.parse(localStorage.getItem("leads"));

    if (leads == null)
        return;

    var lead = leads[g_currentLeadid];
    var status = lead[lead.length - 1];

    if (status == "edited" ||
        status == "checked" || status == "verify") {
        var lead_id = lead[lead.length - 2];

        myApp.showIndicator();

        $.ajax({
            url: SERVER_URL + "lead.php",
            data: "act=delete&lead_id=" + lead_id,
            method: 'POST',
            dataType: 'json',
            error: errorFunctionNoAlert,
            success: function (result) {
                myApp.hideIndicator();

                for (var i = g_tradeshows.tradeshows.length - 1; i >= 0; i--) {
                    if (g_tradeshows.tradeshows[i].id == g_tradeshowId) {
                        g_tradeshows.tradeshows[i].leads_count -= 1;

                        $("#tradeshow-leads").empty().append(g_tradeshows.tradeshows[i].leads_count);

                        g_tradeshows.total_leads_count -= 1;

                        $("#total-leads").empty().append(g_tradeshows.total_leads_count);

                        var tmpdata = JSON.parse(localStorage.getItem("tradeshows")) || [];

                        for (var i = 0; i < tmpdata.length; i++) {
                            if (tmpdata[i].username == g_username) {
                                tmpdata[i].tradeshow = JSON.stringify(g_tradeshows);
                                break;
                            }
                        }

                        localStorage.setItem("tradeshows", JSON.stringify(tmpdata));

                        showChart();

                        break;
                    }
                }
            }
        });
    }

    leads.splice(g_currentLeadid, 1);

    deleteMetadata(g_currentLeadid);

    localStorage.setItem("leads", JSON.stringify(leads));

    initLeadsList();

    myApp.closePanel();
}

function sync() {
    myApp.showIndicator();

    $$.ajax({
        url: SERVER_URL + "get-profile.php?userid=" + g_userId,
        type: "GET",
        dataType: "json",
        success: function (results) {
            if (results.status == "Success") {
                g_profileFieldsAllTrade = results.data;

                var profilefields = JSON.parse(localStorage.getItem("profilefields")) || [];

                for (var i = 0; i < profilefields.length; i++) {
                    if (profilefields[i].username == g_username) {
                        profilefields.splice(i, 1);

                        break;
                    }
                }

                profilefields.push({
                    username: g_username,
                    data: g_profileFieldsAllTrade
                });

                localStorage.setItem("profilefields", JSON.stringify(profilefields));

                g_profileFields = [];

                for (var i = 0; i < g_profileFieldsAllTrade.length; i++) {
                    if (g_profileFieldsAllTrade[i].tradeshow_id == g_tradeshowId) {
                        for (var j = 0; j < g_profileFieldsAllTrade[i].profile.length; j++) {
                            g_profileFields.push(g_profileFieldsAllTrade[i].profile[j].field_name);
                        }
                    }
                }

                initProfileDetails();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            myApp.hideIndicator();

            if (g_currentStatus == 'bizcard') {
                g_currentStatus = "";

                myApp.alert(i18n('Remember to Sync manually when you have a connection'), i18n('Lead Saved'));
            } else {
                myApp.alert(i18n('Please check your server status.'), i18n('No connection Found!'));
            }
        }
    });

    $$.ajax({
        url: SERVER_URL + "get-tradeshows.php?userid=" + g_userId,
        type: "GET",
        dataType: "json",
        error: errorFunctionNoAlert,
        success: function (results) {
            g_tradeshows = results;

            var tradeshow = {
                username: g_username,
                tradeshow: JSON.stringify(results)
            };

            var tradeshows = JSON.parse(localStorage.getItem("tradeshows")) || [];

            for (var i = 0; i < tradeshows.length; i++) {
                if (tradeshows[i].username == g_username) {
                    tradeshows.splice(i, 1);

                    break;
                }
            }

            updateTradeshowImage(tradeshow);

            tradeshows.push(tradeshow);

            localStorage.setItem("tradeshows", JSON.stringify(tradeshows));

            if (g_currentTradeshow) {
                var id = g_currentTradeshow.id;

                g_currentTradeshow = null;

                for (var i = 0; i < g_tradeshows.tradeshows.length; i++) {
                    var tradeshow = g_tradeshows.tradeshows[i];

                    if (tradeshow.id === id) {
                        g_currentTradeshow = tradeshow;

                        break;
                    }
                }

                for (var i = g_tradeshows.tradeshows.length - 1; i >= 0; i--) {
                    if (g_tradeshows.tradeshows[i].id == g_tradeshowId) {

                        $("#tradeshow-leads").empty().append(g_tradeshows.tradeshows[i].leads_count);

                        $("#total-leads").empty().append(g_tradeshows.total_leads_count);

                        showChart();

                        break;
                    }
                }
            }

            updateEmailButton();

            initTradeShowList();

            checkMessages();

            $$.ajax({
                url: SERVER_URL + "get-user.php?act=check&userid=" + g_userId,
                method: 'GET',
                dataType: "json",
                error: errorFunctionNoAlert,
                success: function (result) {
                    if (result.status == "success") {
                        $$.ajax({
                            url: SERVER_URL + "question-update.php?userid=" + g_userId + "&answers=1",
                            type: "GET",
                            dataType: "json",
                            error: errorFunctionNoAlert,
                            success: function (results) {
                                myApp.hideIndicator();

                                g_QAs = JSON.parse(localStorage.getItem("questions")) || [];

                                for (var i = 0; i < results.length; i++) {
                                    for (var j = 0; j < g_QAs.length; j++) {
                                        if (g_QAs[j].tradeshow_id == results[i].tradeshow_id) {
                                            g_QAs.splice(j, 1);

                                            break;
                                        }
                                    }
                                }

                                for (var i = 0; i < results.length; i++) {
                                    g_QAs.push(results[i]);
                                }

                                localStorage.setItem("questions", JSON.stringify(g_QAs));

                                var leads = JSON.parse(localStorage.getItem("leads"));

                                if (leads == null)
                                    return;

                                for (var i = leads.length - 1; i >= 0; i--) {
                                    var lead = leads[i];

                                    if (lead[0].split(",")[0] == g_username &&
                                        lead[0].split(",")[1] == g_tradeshowId) {
                                        var status = lead[lead.length - 1];

                                        if (status == "todo") {
                                            // at least check if phone thinks it is online before initiating the ocr
                                            if ('onLine' in navigator && navigator.onLine) {
                                                lead[lead.length - 1] = "progress";
                                                leads[i] = lead;

                                                uploadImage(lead[2]);
                                            }

                                        } else if (status == "progress") {
                                        } else if (status == "verify") {
                                        } else if (status == "complete_manually") {
                                            saveLeadtoServer(lead, i);
                                        } else if (status == "complete") {
                                            lead[lead.length - 1] = "checkingprocess";

                                            leads[i] = lead;

                                            updateLeadtoServer(lead, i);
                                        } else if (status == "checkingprocess") {
                                        } else if (status == "checked") {
                                        } else if (status == "edited") {
                                            lead[lead.length - 1] = "checkingprocess";

                                            leads[i] = lead;

                                            updateLeadtoServer(lead, i);
                                        }
                                    }
                                }

                                localStorage.setItem("leads", JSON.stringify(leads));

                                postponeSyncCheck(false);

                                initLeadsList();
                            }
                        });
                    } else if (result.status == "fail") {
                        myApp.hideIndicator();

                        myApp.alert(i18n("Please contact your reseller for further access."), i18n("Sorry your account expired."));
                    }
                }
            });
        },
    });
}

function saveLeadtoServer(leadData, symbol) {
    myApp.showIndicator();

    var tmp = [];

    for (var k = 0; k < 7; k++) {
        if (k == 0) {
            tmp[k] = leadData[k].split(",")[0];
            datetime = leadData[k].split(",")[2];
            scanType = leadData[k].split(",")[3];
        } else {
            tmp[k] = leadData[k];
        }
    }

    if (tmp[2] != "") {
        tmp[2] = SERVER_URL + "uploads/images/" + g_username + tmp[2].substr(tmp[2].lastIndexOf('/') + 1);
    }

    if (tmp[4] && tmp[4].name) {
        var timestamp = Date.now();

        tmp[4] = SERVER_URL + "uploads/audios/" + g_username + timestamp + /*tmp[4].name +*/ '.mp3';

        uploadAudio(leadData[4], timestamp);
    }

    for (var k = 7; k < g_profileFields.length + 7; k++) {
        var tmp1 = leadData[k];

        for (var key in tmp1) {
            var tmp2 = tmp1[key];

            if (typeof tmp2 == 'undefined') {
                tmp2 = '';
            }

            tmp1[key] = tmp2.replace('+', encodeURIComponent('+'));

            tmp.push(tmp1);
        }
    }

    for (var k = g_profileFields.length + 7; k < leadData.length - 1; k++) {
        tmp[k] = leadData[k];
    }

    tmp = JSON.stringify(tmp);

    var tmp1 = tmp.replace(/&/g, "##");

    tmp = tmp1;

    $.ajax({
        url: SERVER_URL + "lead.php",
        data: "act=add&username=" + g_username +
              "&scanType=" + scanType +
              "&leadData=" + tmp +
              "&symbol=" + symbol +
              "&tradeshow_id=" +
              g_tradeshowId + "&dateTime=" +
              datetime + "&photo=" +
              encodeURIComponent(g_photo),
        method: 'POST',
        dataType: 'json',
        success: function (result) {
            myApp.hideIndicator();

            checkMessages();

            var leads = JSON.parse(localStorage.getItem("leads"));

            if (leads == null)
                return;

            var lead = leads[result.symbol];

            if (lead[lead.length - 1] == 'complete' ||
                lead[lead.length - 1] == 'complete_manually') {
                lead[lead.length - 1] = result.id;

                var fields = {};

                for (var i = 7; i < lead.length; i++) {
                    var keys = Object.keys(lead[i]);

                    if (keys) {
                        var key = keys[0];

                        var value = lead[i][key];

                        fields[key] = lead[i][key];
                    }
                }

                for (var i in result.fields) {
                    for (var j in result.fields[i]) {
                        for (var k in lead) {
                            if (typeof lead[k][j] != 'undefined') {
                                lead[k][j] = result.fields[i][j];

                                break;
                            }
                        }
                    }
                }

                lead.push("checked");
            } else {
                if (lead[lead.length - 1] != 'checked') {
                    lead[lead.length - 1] = result.id;

                    lead.push("verify");
                }
            }

            leads[result.symbol] = lead;

            localStorage.setItem("leads", JSON.stringify(leads));

            if (g_selfMode === false) {
                initLeadsList();
            }

            for (var i = g_tradeshows.tradeshows.length - 1; i >= 0; i--) {
                if (g_tradeshows.tradeshows[i].id == g_tradeshowId) {
                    g_tradeshows.tradeshows[i].leads_count += 1;

                    $("#tradeshow-leads").empty().append(g_tradeshows.tradeshows[i].leads_count);

                    g_tradeshows.total_leads_count += 1;

                    $("#total-leads").empty().append(g_tradeshows.total_leads_count);

                    var tmpdata = JSON.parse(localStorage.getItem("tradeshows")) || [];

                    for (var i = 0; i < tmpdata.length; i++) {
                        if (tmpdata[i].username == g_username) {
                            tmpdata[i].tradeshow = JSON.stringify(g_tradeshows);

                            break;
                        }
                    }

                    localStorage.setItem("tradeshows", JSON.stringify(tmpdata));

                    showChart();

                    break;
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            myApp.hideIndicator();

            myApp.alert(i18n('Remember to Sync manually when you have a connection'), i18n('Lead Saved'));

            var leads = JSON.parse(localStorage.getItem("leads"));

            if (leads == null)
                return;

            for (var i = leads.length - 1; i >= 0; i--) {
                var lead = leads[i];

                if (lead[0].split(",")[0] == g_username &&
                    lead[0].split(",")[1] == g_tradeshowId) {
                    var status = lead[lead.length - 1];

                    if (status == "checkingprocess") {
                        lead[lead.length - 1] = "complete";

                        leads[i] = lead;
                    }
                }
            }

            if (g_selfMode === false) {
                initLeadsList();
            }
        }
    });
}

function updateLeadtoServer(leadData, symbol) {
    myApp.showIndicator();

    var tmp = [];

    for (var k = 0; k < 7; k++) {
        if (k == 0) {
            tmp[k] = leadData[k].split(",")[0];
            datetime = leadData[k].split(",")[2];
            scanType = leadData[k].split(",")[3];
        } else {
            tmp[k] = leadData[k];
        }
    }

    if (tmp[2] != "") {
        tmp[2] = SERVER_URL + "uploads/images/" + g_username + tmp[2].substr(tmp[2].lastIndexOf('/') + 1);
    }

    if (tmp[4] && tmp[4].name) {
        var timestamp = Date.now();

        tmp[4] = SERVER_URL + "uploads/audios/" + g_username + timestamp + /*tmp[4].name +*/ '.mp3';

        uploadAudio(leadData[4], timestamp);
    }

    for (var k = 7; k < g_profileFields.length + 7; k++) {
        var tmp1 = leadData[k];

        for (var key in tmp1) {
            var tmp2 = tmp1[key];

            if (typeof tmp2 == 'undefined') {
                tmp2 = '';
            }

            tmp1[key] = tmp2.replace('+', encodeURIComponent('+'));

            tmp.push(tmp1);
        }
    }

    for (var k = g_profileFields.length + 7; k < leadData.length - 1; k++) {
        tmp[k] = leadData[k];
    }

    tmp = JSON.stringify(tmp);

    var tmp1 = tmp.replace(/&/g, "##");

    tmp = tmp1;

    $.ajax({
        url: SERVER_URL + "lead.php",
        data: "act=update&username=" + g_username +
              "&leadData=" + tmp +
              "&scanType=" + scanType +
              "&symbol=" + symbol +
              "&tradeshow_id=" + g_tradeshowId +
              "&dateTime=" + datetime +
              "&photo=" + encodeURIComponent(g_photo),
        method: 'POST',
        dataType: 'json',
        success: function (result) {
            myApp.hideIndicator();

            var leads = JSON.parse(localStorage.getItem("leads"));

            if (leads == null)
                return;

            var lead = leads[result.symbol];

            lead[lead.length - 1] = result.id;

            lead.push("checked");

            leads[result.symbol] = lead;

            localStorage.setItem("leads", JSON.stringify(leads));

            initLeadsList();
        },
        error: function (xhr, textStatus, errorThrown) {
            myApp.hideIndicator();

            myApp.alert(i18n('Please check your server status.'), i18n('No connection Found!'));

            var leads = JSON.parse(localStorage.getItem("leads"));

            if (leads == null)
                return;

            for (var i = leads.length - 1; i >= 0; i--) {
                var lead = leads[i];

                if (lead[0].split(",")[0] == g_username &&
                    lead[0].split(",")[1] == g_tradeshowId) {
                    var status = lead[lead.length - 1];

                    if (status == "checkingprocess") {
                        lead[lead.length - 1] = "complete";

                        leads[i] = lead;
                    }
                }
            }

            localStorage.setItem("leads", JSON.stringify(leads));

            initLeadsList();
        }
    });
}

function deleteLeadtoServer(leadData) {
    var lead_id = leadData[leadData.length - 2];

    myApp.showIndicator();

    $.ajax({
        url: SERVER_URL + "lead.php",
        data: "act=delete&lead_id=" + lead_id,
        method: 'POST',
        dataType: 'json',
        error: errorFunction,
        success: function (result) {
            myApp.hideIndicator();

            for (var i = g_tradeshows.tradeshows.length - 1; i >= 0; i--) {
                if (g_tradeshows.tradeshows[i].id == g_tradeshowId) {
                    g_tradeshows.tradeshows[i].leads_count -= 1;

                    $("#tradeshow-leads").empty().append(g_tradeshows.tradeshows[i].leads_count);

                    g_tradeshows.total_leads_count -= 1;

                    $("#total-leads").empty().append(g_tradeshows.total_leads_count);

                    showChart();

                    break;
                }
            }
        }
    });
}

// upload images to the ocr service
function uploadImage(imageURI) {
    if (imageURI == "") {
        return;
    }

    if (window.cordova.platformId === 'android') {
        uploadImageAndroid(imageURI);
        return;
    }

    var options = new FileUploadOptions();

    options.fileKey = "file";
    options.fileName = g_username + imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";

    var params = new Object();

    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();

    ft.upload(imageURI, encodeURI(SERVER_URL + "upload-images.php"), win, fail, options);
}

function uploadImageAndroid(imageURI) {
    var fileName = g_username + imageURI.substr(imageURI.lastIndexOf('/') + 1);
    // loads local file with http GET request
    var xhrLocal = new XMLHttpRequest()
    xhrLocal.open('get', imageURI)
    xhrLocal.responseType = 'blob'
    xhrLocal.onerror = () => {
        fail(Error('An error ocurred getting localpath on' + imageURI))
    }
    xhrLocal.onload = () => {
        // when data is loaded creates a file reader to read data
        var fr = new FileReader()
        fr.onload = function (e) {
            // fetch the data and accept the blob
            fetch(e.target.result)
                .then(res => res.blob())
                .then((res) => {
                    // now creates another http post request to upload the file
                    var formData = new FormData()
                    formData.append('file', res, fileName)
                    // post form data
                    const xhrRemote = new XMLHttpRequest()
                    xhrRemote.responseType = 'text'
                    // log response
                    xhrRemote.onerror = () => {
                        xhrRemote.source = fileName;
                        fail(xhrRemote)
                    }
                    xhrRemote.onload = () => {
                        xhrRemote.response = xhrRemote.responseText;
                        win(xhrRemote)
                    }

                    // create and send the reqeust
                    xhrRemote.open('POST', SERVER_URL + 'upload-images.php')
                    xhrRemote.send(formData)
                })
        }
        fr.readAsDataURL(xhrLocal.response) // async call
    }
    xhrLocal.send()
}

function win(r) {
    var indexConfirm = false;

    leads = JSON.parse(localStorage.getItem("leads"));

    if (leads == null || leads.length == 0) {
        leads = null;
    }

    // user have no previously saved leads and also doesn't have any opened new lead
    // i.e. maybe while the ocr was running he decided to delete the lead
    if (leads == null && g_currentStatus != 'bizcard') {
        return;
    }

    var index = 0;

    if (isJSON(r.response)) {
        var result = JSON.parse(r.response);

        if (result.status == "success") { // ocr was a success
            var bizURL = result.bizURL;
            // the returned ocr isnt for the current new and opened lead, and we have no other previously saved leads there is no need to go farther
            if (leads == null &&
                !(g_currentStatus == 'bizcard' && bizURL == g_username + g_currentBizUrl.substr(g_currentBizUrl.lastIndexOf('/') + 1))) {
                return;
            }

            // prepare the returned ocr'd data to be saved/displayed
            if (result.FirstName) {
                result['First Name'] = result.FirstName;

                if (result.MiddleName)
                    result['First Name'] += ' ' + result.MiddleName;

                if (result.LastName)
                    result['Last Name'] = result.LastName;
            } else if (result.Name) {
                var lname = result.Name;

                if (lname != null) {
                    var arrname = lname.split(" ");
                    var lfname = arrname[0];
                    var llname = arrname[1];

                    result['First Name'] = lfname;
                    result['Last Name'] = llname;
                }
            }

            if (result.StreetAddress) {
                result.Address = result.StreetAddress;
            }

            // ocr is for a newly created lead that is yet to be saved (and its form is still opened)
            // i.e. user created a lead and started its ocr which finished and returned even before the user close the lead
            if (g_currentStatus == 'bizcard' && bizURL == g_username + g_currentBizUrl.substr(g_currentBizUrl.lastIndexOf('/') + 1)) {
                g_currentOcrStatus = ocrStatus.COMPLETE;
            }

            if (leads != null) {
                for (var i = leads.length - 1; i >= 0; i--) {
                    var lead = leads[i];
                    var leadBizURL = g_username + lead[2].substr(lead[2].lastIndexOf('/') + 1);

                    if (bizURL == leadBizURL && lead[lead.length - 1] == "progress") {
                        lead[lead.length - 1] = "verify";

                        for (var j = 7; j < lead.length; j++) {
                            var keys = Object.keys(lead[j]);

                            if (keys) {
                                var key = keys[0];
                                var value = result[key];

                                if (!lead[j][key] && value) {
                                    lead[j][key] = value;
                                }
                            }
                        }

                        indexConfirm = true;
                        leads[i] = lead;

                        index = i;
                    }
                }

                if (leads.length == 0) {
                    leads.push(result);
                }
            }

            // ocr is for the currently opened lead hence we need to use it to fill the fields
            if (bizURL == g_username + g_currentBizUrl.substr(g_currentBizUrl.lastIndexOf('/') + 1)) {
                for (var i = 0; i < g_profileFields.length; i++) {
                    field_name = g_profileFields[i];
                    // ocr reply came with some value for the field & the field wasn't filled before
                    if (result[field_name] && !$('#detailfieldvalue' + i + '').val()) {
                        // fill the field
                        $('#detailfieldvalue' + i + '').val(result[field_name]);
                    }
                }
            }

        } else {
            alert(result, i18n("parsed but error"));
        }

    } else { // ocr service replied but failed to parse, i.e. image is too blurred to be ocr'd
        var arrResponse = r.response.split("=====");

        myApp.alert(arrResponse[0], i18n("scan error"));

        var bizURL = arrResponse[1];

        // the returned ocr isnt for the current new and opened lead, and we have no other previously saved leads
        if (leads == null &&
            !(g_currentStatus == 'bizcard' && bizURL == g_username + g_currentBizUrl.substr(g_currentBizUrl.lastIndexOf('/') + 1))) {
            return;
        }

        if (g_currentStatus == 'bizcard' && bizURL == g_username + g_currentBizUrl.substr(g_currentBizUrl.lastIndexOf('/') + 1)) {
            g_currentOcrStatus = ocrStatus.TODO;
        }
        if (leads != null) {
            for (var i = leads.length - 1; i >= 0; i--) {
                var lead = leads[i];

                var leadBizURL = g_username + lead[2].substr(lead[2].lastIndexOf('/') + 1);

                if (bizURL == leadBizURL && lead[lead.length - 1] == "progress") {
                    lead[lead.length - 1] = "todo";
                }
            }
        }
    }

    localStorage.setItem("leads", JSON.stringify(leads));

    initLeadsList();

    if (leads !== null) {

        if (indexConfirm === false) {
            index = leads.length - 1;
        }

        var lead = leads[index];
        if (lead[lead.length - 1] === "verify") {
            saveLeadtoServer(leads[index], index);
        }
    }
}

function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }

    return true;
}

function fail(error) {
    var leads = JSON.parse(localStorage.getItem("leads"));

    // user have no previously saved leads and also doesn't have any opened new lead matching the failed ocr
    // i.e. maybe while the ocr was running he decided to delete the lead or recapture a new image while the old one is being ocr'd
    if (leads == null &&
        !(g_currentStatus == 'bizcard' && g_currentBizUrl.replace(/\D/g, "") == (error.source).replace(/\D/g, ""))) {
        return;
    }

    // if the failed ocr is associated with the currently opened new lead
    if (g_currentStatus == "bizcard" && g_currentBizUrl.replace(/\D/g, "") == (error.source).replace(/\D/g, "")) {
        g_currentOcrStatus = "todo";
    }
    if (leads != null) {
        for (var i = leads.length - 1; i >= 0; i--) {
            var lead = leads[i];
            var leadBizURL = g_username + lead[2].substr(lead[2].lastIndexOf('/') + 1);

            if (error.source == lead[2] &&
                lead[lead.length - 1] == "progress") {
                lead[lead.length - 1] = "todo";

                leads[i] = lead;
            }
        }

        localStorage.setItem("leads", JSON.stringify(leads));
    }

    initLeadsList();
}

function uploadAudio(mediaFile, timestamp) {
    if (!mediaFile) {
        return;
    }

    var ft = new FileTransfer(),
        path = mediaFile.fullPath;
    //name = g_username + timestamp + mediaFile.name;
    name = g_username + timestamp;

    ft.upload(
        path,
        encodeURI(SERVER_URL + "upload-audios.php"),
        function (result) {
            var leads = JSON.parse(localStorage.getItem("leads")) || [];

            for (var i = leads.length - 1; i >= 0; i--) {
                if (leads[i][4] && leads[i][4].fullPath) {
                    if (leads[i][4].fullPath == path) {
                        leads[i][4] = SERVER_URL + "uploads/audios/" + name + '.mp3';
                    }
                }
            }

            localStorage.setItem("leads", JSON.stringify(leads));
        },
        function (error) {
        }, {
            fileName: name
        });
}

//===============profile details===========//
function initFields() {
    g_currentAudio = '';
    g_photo = '';
    g_currentOcrStatus = '';

    if (g_currentStatus != "bizcard") {
        document.getElementById('bizcard-part').style.display = "none";

        g_currentBizUrl = '';
    } else {
        document.getElementById('bizcard-part').style.display = "block";
    }

    for (var i = 0; i < g_profileFields.length; i++) {
        field_name = g_profileFields[i];

        $('#detailfield' + i + '').text(i18n(getFieldName(field_name)) + (isFieldMandatory(field_name) ? ' *' : ''));
        $('#detailfield' + i + '').css('color', '#0069D2');
        $$('#detailfieldvalue' + i + '').val("");
    }

    $("#barcode_result").val("");
    $("#note_text").val("");

    var elements = document.getElementsByClassName("qa_list");

    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }

    printQuestions();

    var icon_audio = document.getElementById("btn-capture-audio");

    if (icon_audio && icon_audio.style) {
        icon_audio.style.background = "white";
    }

    var icon_note = document.getElementById("btn-quick-note");

    if (icon_note && icon_note.style) {
        icon_note.style.background = "white";
    }

    $('#btn-play-audio').hide();
}

function setFields(lead_id) {
    initFields();

    var leads = JSON.parse(localStorage.getItem("leads")) || [];
    var lead = leads[lead_id];

    g_currentCreateTime = lead[0].split(",")[2];
    g_scanType = lead[0].split(",")[3];
    g_currentBizUrl = lead[2];
    g_groupID = parseInt(lead[5]) || false;
    g_groupRole = lead[6];

    if (lead[2] == "") {
        document.getElementById('bizcard-part').style.display = "none";

        $('.panel-collapse').collapse("hide");
        $('#collapseOne').collapse("show");
    } else {
        document.getElementById('bizcard-part').style.display = "block";

        $('.collapse').collapse("hide");

        loadImage(lead[2]);

        var state = lead[lead.length - 1];

        if (state != "todo") {
            document.getElementById('btn_biz_scan_container').style.display = "none";
        } else {
            document.getElementById('btn_biz_scan_container').style.display = "block";
        }
    }

    $("#barcode_result").val(lead[3]);

    if (typeof lead[4] == 'string')
        g_currentAudio = lead[4];

    if (g_currentAudio) {
        var icon = document.getElementById("btn-capture-audio");

        if (icon && icon.style) {
            icon.style.background = "#c7c7c7";
        }

        $('#btn-play-audio').show();
    } else {
        var icon = document.getElementById("btn-capture-audio");

        if (icon && icon.style) {
            icon.style.background = "white";
        }

        $('#btn-play-audio').hide();
    }

    loadPhoto(getMetadata(lead_id, 'photo'));

    //////////////add non-exist profile after sync///////////////////
    for (var k in g_profileFields) {
        var find = false;
        var lastindex = 0;

        for (var l = 7; l < lead.length; l++) {
            if (typeof lead[l] === 'string') {
                lastindex = l;

                break;
            }

            for (var key in lead[l]) {
                if (key == g_profileFields[k])
                    find = true;
            }
        }

        if (!find) {
            var new_key = g_profileFields[k];
            var adding = {};

            adding[new_key] = "";

            lead.splice(lastindex, 0, adding);
        }
    }

    //////////////delete non-exist profile after sync////////////////
    for (var l = 7; l < lead.length; l++) {
        if (typeof lead[l] === 'string') {
            break;
        }

        var find = false;

        for (var key in lead[l]) {
            for (var k in g_profileFields) {
                if (key == g_profileFields[k])
                    find = true;
            }

            if (!find) {
                lead.splice(l, 1);

                l--;
            }
        }
    }

    //////////////save lead//////////////////
    leads[lead_id] = lead;

    localStorage.setItem("leads", JSON.stringify(leads));
    /////////////////////////////////////////

    $("#note_text").val(lead[7 + g_profileFields.length]);

    if (lead[7 + g_profileFields.length] != "") {
        var icon = document.getElementById("btn-quick-note");

        if (icon && icon.style) {
            icon.style.background = "#c7c7c7";
        }
    } else {
        var icon = document.getElementById("btn-quick-note");

        if (icon && icon.style) {
            icon.style.background = "white";
        }
    }

    var values = {};

    for (var i = 7; i < lead.length; i++) {
        var keys = Object.keys(lead[i]);

        if (keys) {
            var key = keys[0];

            if (key) {
                values[key] = lead[i][key];
            }
        }
    }

    /*
     if (key == "Redefine field") {
     $('#detailfield' + i + '').css('color', '#ff9000');
     }
     */
    for (var i = 0; i < g_profileFields.length; i++) {
        var field = getFieldByPosition(i);

        if ('undefined' !== typeof(values[field])) {
            var value = values[field];

            $$('#detailfieldvalue' + i).val(value);
        }
    }

    ////////////////////////question/////////////////////////////////
    var qaData = lead[g_profileFields.length + 8];
    var selected_QA = null;

    for (var i = 0; i < g_QAs.length; i++) {
        if (g_QAs[i].tradeshow_id == g_tradeshowId) {
            selected_QA = g_QAs[i].questions;

            break;
        }
    }

    if (selected_QA) {
        var tmpQAs = [];

        for (var i = 0; i < selected_QA.length; i++) {
            var tmpQA = {};
            var questionname = selected_QA[i].qtn_txt;
            var id = selected_QA[i].id;
            var freeanswer = "";
            var state = "";
            var required = selected_QA[i].required;

            for (var tt = 0; tt < qaData.length; tt++) {
                if (qaData[tt].question.id == id) {
                    freeanswer = qaData[tt].question.freeanswer;
                    state = qaData[tt].question.state;

                    break;
                }
            }

            var tmpQ = {
                id: id,
                questionname: questionname,
                freeanswer: freeanswer,
                state: state
            };

            var tmpAs = [];

            var answers = selected_QA[i].answers;

            for (var j = 0; j < answers.length; j++) {
                var answername = answers[j].answers;
                var answervalue = false;
                var astate = "";

                for (var tt = 0; tt < qaData.length; tt++) {
                    if (qaData[tt].question.id == id) {
                        var ttanswer = qaData[tt].answer;

                        for (var kk = 0; kk < ttanswer.length; kk++) {
                            if (ttanswer[kk].answername == answername) {
                                answervalue = ttanswer[kk].answervalue;
                                astate = ttanswer[kk].astate;

                                break;
                            }
                        }

                        break;
                    }
                }

                var tmpA = {
                    answername: answername,
                    answervalue: answervalue,
                    astate: astate
                };

                tmpAs.push(tmpA);
            }

            tmpQA = {
                question: tmpQ,
                answer: tmpAs
            };

            tmpQAs.push(tmpQA);
        }
    }

    lead[g_profileFields.length + 8] = tmpQAs;

    leads[lead_id] = lead;

    localStorage.setItem("leads", JSON.stringify(leads));

    qaData = lead[g_profileFields.length + 8];

    var elements = document.getElementsByClassName("qa_list");

    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }

    printQuestions(qaData);
}

//===============email all data==================
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
}

function addEmail() {
    var ans = $("#answer").val();

    if (ans.length == 0) {
        myApp.alert(i18n("field is empty!"), i18n('Input error!'));

        $("#answer").focus();

        return;
    }

    if (!validateEmail(ans)) {
        myApp.alert(i18n("Invalid email!"), i18n('Input error!'));

        $("#answer").focus();

        return;
    }

    g_emails.push(ans);

    showAns();

    $("#answer").val("");
}

function showAns() {
    var str = "";

    if (g_emails.length > 0) {
        for (i = 0; i < g_emails.length; i++) {
            str += '<div style="float:left;padding:5%;width:70%">';
            str += '  <b>' + g_emails[i] + '</b>';
            str += '</div>';
            str += '<div style="float:left;padding:5%">';
            str += '  <input name="" type="button" value="-" onclick="deleteAns(' + i + ')" class="del red">';
            str += '</div>';
        }
    }

    $("#list").html(str);
}

function deleteAns(pos) {
    g_emails.splice(pos, 1);

    showAns();
}

function send() {
    var question = "";
    var ans = "";

    question = $("#admin-email").val();

    if (question.length == 0) {
        myApp.alert(i18n("field is empty!"), i18n('Input error!'));

        $("#admin-email").focus();

        return;
    }

    if (question == "") {
        myApp.alert(i18n("field is empty!"), i18n('Input error!'));

        $("admin-email").focus();

        return;
    }

    if (!validateEmail(question)) {
        myApp.alert(i18n("Invalid email!"), i18n('Input error!'));

        $("#answer").focus();

        return;
    }

    ans = g_emails.join();

    if (question)
        ans = (ans ? ans + ',' : '') + question;

    var e = document.getElementById("separator");
    var separator = e.options[e.selectedIndex].text;

    myApp.showIndicator();

    $$.ajax({
        url: SERVER_URL + "get-user.php?act=check&userid=" + g_userId,
        method: 'GET',
        dataType: "json",
        success: function (result) {
            if (result.status == "success") {
                $.ajax({
                    url: SERVER_URL + "csv_attach.php",
                    data: "permission=user&to=" + ans + "&id=" + g_username + "&separator=" + separator + "&tradeshow_id=" + g_tradeshowId,
                    method: 'POST',
                    dataType: 'json',
                    error: errorFunction,
                    success: function (result) {
                        myApp.hideIndicator();

                        if (result == 1) {
                            myApp.alert(i18n("Report sent successfully!"), i18n('Success!'));

                            mainView.router.load({
                                pageName: 'trades'
                            });
                        } else {
                            myApp.alert(i18n("field is empty!"), i18n('Input error!'));
                        }
                    }
                });
            } else if (result.status == "fail") {
                myApp.hideIndicator();

                myApp.alert(i18n("Please contact your reseller for further access."), i18n("Sorry your account expired."));
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            myApp.hideIndicator();

            myApp.alert(i18n('Re-connect to internet to sync all your data.'), i18n('No connection Found!'));
        }
    });
}

function cancel() {
    mainView.router.load({
        pageName: 'home'
    });
}

function getFieldByPosition(position) {
    var field = $('#detailfield' + position + '').data('name-raw');
    if (field)
        field = field.replace(/ \*$/, '');
    else
        return false;

    return getFieldId(field);
}

function showRequiredError(missingFields, missingQuestions) {
    myApp.alert(i18n('Please complete the missing fields.'), i18n('Fields marked * are mandatory'), function () {
        if (missingFields.length) {
            var missingField = missingFields[0];

            for (var i = 0; i < g_profileFields.length; i++) {
                if (missingField == g_profileFields[i]) {
                    $('#detailfieldvalue' + i).focus();
                    window.scrollBy(0, -100);

                    break;
                }
            }
        } else if (missingQuestions.length) {
            var missingQuestion = missingQuestions[0];

            for (var i = 0; i < g_QAs.length; i++) {
                var tradeshow = g_QAs[i];

                if (tradeshow.tradeshow_id == g_tradeshowId) {
                    var questions = tradeshow.questions;

                    for (var j = 0; j < questions.length; j++) {
                        var question = questions[j];

                        if (question.id == missingQuestion) {
                            var containerId = '#headingTwo' + question.id;

                            window.location.href = containerId;

                            $(containerId).find('a.questionname').click();

                            break;
                        }
                    }

                    break;
                }
            }
        }
    });
}

function saveLead() {
    var leaddata = [];
    var currentdate = new Date();
    var datetime = currentdate.getFullYear() + "-" +
        (currentdate.getMonth() + 1) + "-" +
        currentdate.getDate() + " " +
        currentdate.getHours() + ":" +
        currentdate.getMinutes() + ":" +
        currentdate.getSeconds();

    if (g_currentCreateTime != "") {
        datetime = g_currentCreateTime;
        g_currentCreateTime = "";
    }

    leaddata.push(g_username + "," + g_tradeshowId + "," + datetime + "," + g_scanType);
    leaddata.push(g_currentTradeshowName);
    leaddata.push(g_currentBizUrl);
    leaddata.push($("#barcode_result").val());
    leaddata.push(g_currentAudio);
    leaddata.push(g_groupRole ? g_groupID : "");
    leaddata.push(g_groupRole ? g_groupRole : "");

    var email = "";
    var name = "";
    var company = "";
    var missingFields = [];
    var missingQuestions = [];

    for (var i = 0; i < g_profileFields.length; i++) {
        var tmp = {};
        var value = $$('#detailfieldvalue' + i + '').val();
        var field = getFieldByPosition(i);

        if (field === false)
            continue;

        tmp[field] = value;

        if (field == "Email") {
            email = value;
        }

        if (field == "First Name" || field == "Last Name") {
            name = value;
        }

        if (field == "Company") {
            company = value;
        }

        leaddata.push(tmp);

        // handle the bypass of mandatory fields, allowing the user to save and edit without filling those fields
        // this covers the cases where
        // 1. lead is just being created hence never was saved before, and the user wants to save before its ocr is complete
        // 2. lead was previously saved and its ocr was completed, and the user decided to re-capture/re-ocr its image and save before the ocr of new image is complete
        // 3. lead was previously saved and its ocr wasn't completed, and the user is just editing it and save without waiting for the ocr to complete
        if (isFieldMandatory(field) && !value) {
            // the ocr associated with the current lead is already complteted
            if (g_currentOcrStatus && g_currentOcrStatus == ocrStatus.COMPLETE) {
                missingFields.push(field);
            } else if (g_currentStatus != "bizcard" && g_currentLeadid >= 0) { // lead is an old one that is just being edited
                var leads = JSON.parse(localStorage.getItem("leads")) || [];
                var state = leads.length ? leads[g_currentLeadid].pop() : null;
                // the ocr associated with the current lead is already complteted
                if (state != "todo" && state != "progress") {
                    missingFields.push(field);
                }
            } else if (g_currentOcrStatus === '' && g_onlineStatus === 'online') {
                missingFields.push(field);
            }
        }
    }

    if (g_selfMode === false)
        leaddata.push($("#note_text").val());
    else
        leaddata.push($("#note_text_self").val());

    var questionnames = document.getElementsByClassName('questionname');
    var answernames = document.getElementsByClassName('answername');
    var answervalues = document.getElementsByClassName('checkanswerlist');

    var tmpQAs = [];

    for (var i = 0; i < questionnames.length; i++) {
        var tmpQA = {};

        var questionname = questionnames[i].firstChild.nodeValue;
        var id = questionnames[i].getAttribute('data-question-id');
        var freeanswerInput = document.getElementById('freeanswer' + id);
        var freeanswer = freeanswerInput ? freeanswerInput.value : '';
        var state = "";
        var isQuestionAnswered = false;

        if (freeanswerInput && freeanswerInput.style.display == "none") {
            state = "delete";
        }

        var tmpQ = {
            id: id,
            questionname: questionname,
            freeanswer: freeanswer,
            state: state
        };

        var tmpAs = [];

        for (var j = 0; j < answernames.length; j++) {
            var tmpqaid = answervalues[j].id;
            var arrid = tmpqaid.split("&");
            var tmpqid = arrid[0];

            if (id == tmpqid) {
                var answervalue = answervalues[j].checked;

                if (answervalue) {
                    isQuestionAnswered = true;
                }

                var astate = "";

                if (answernames[j].style.display == "none") {
                    astate = "delete";
                }

                var answername = answernames[j].firstChild.nodeValue;

                var tmpA = {
                    answername: answername,
                    answervalue: answervalue,
                    astate: astate
                };

                tmpAs.push(tmpA);
            }
        }

        if (jQuery(questionnames[i]).is(':visible') && isQuestionMandatory(id) && !isQuestionAnswered && !freeanswer) {
            missingQuestions.push(id);
        }

        tmpQA = {
            question: tmpQ,
            answer: tmpAs
        };

        tmpQAs.push(tmpQA);
    }

    leaddata.push(tmpQAs);

    var isQuickScan = g_currentStatus === 'quick_scan';

    if ('onLine' in navigator && navigator.onLine) {

    } else {
        missingFields = [];
        //missingQuestions = [];
    }

    if (!isQuickScan && !g_selfMode) {
        if (missingFields.length || missingQuestions.length) {
            showRequiredError(missingFields, missingQuestions);

            return;
        }
        // else {
        //     if (email && !validateEmail(email)) {
        //         myApp.alert("Invalid email!", 'Input error!');
        //
        //         return;
        //     }
        // }
    } else {
        g_currentStatus = "manually";
    }

    var isBarCode = $("#barcode_result").val() != "";

    if (g_currentStatus == "manually") {
        if (isBarCode) {
            if (email == "")
                email = "undefined email";

            if (name == "")
                name = "undefined name";

            if (company == "")
                company = "undefined company";
        }
    }

    var leads = JSON.parse(localStorage.getItem("leads")) || [];

    if (g_currentStatus == "manually") {
        leaddata.push("complete_manually");

        leads.push(leaddata);
    } else if (g_currentStatus == "bizcard") { // current user is a newly created one which was never saved before

        if (g_currentOcrStatus == ocrStatus.COMPLETE) { // ocr for the lead was finished in the time of saving
            leaddata.push("verify");
        } else if (g_currentOcrStatus == ocrStatus.INPROGRESS) { // ocr is still running for the lead in the time of saving
            leaddata.push("progress");
        } else { // ocr failed or never started
            leaddata.push("todo");
        }

        leads.push(leaddata);
    } else if (g_currentStatus == "update") {
        var status = leads[g_currentLeadid].pop();

        if (status == "verify") {
            leaddata.push(leads[g_currentLeadid].pop());
            leaddata.push("complete");
        } else if (status == "checked") {
            leaddata.push(leads[g_currentLeadid].pop());
            leaddata.push("edited");
        } else if (status == "checkingprocess") {
            leaddata.push(leads[g_currentLeadid].pop());
            leaddata.push("complete");
        } else {
            leaddata.push(status);
        }

        leads[g_currentLeadid] = leaddata;
    }

    setMetadata(g_currentStatus == 'update' ? g_currentLeadid : leads.length - 1, 'photo', g_photo);

    try {
        localStorage.setItem("leads", JSON.stringify(leads));

        if (g_selfMode === false) {
            $('.scroll-page').animate({
                scrollTop: 0
            }, 0, 'easeInOutQuad');

            initLeadsList();
        } else {
            $$('.end-section').removeClass('hidden');

            setTimeout(function() {
                initSelfreg(g_tradeshowId);
            }, 2000);
        }

        if (!isQuickScan && !g_selfMode) {
            cancel();
        }

        if (g_currentStatus == 'bizcard') {

            if (leaddata[leaddata.length - 1] === "verify") {
                saveLeadtoServer(leaddata, leads.length - 1);
            }
            sync();
        } else if (g_currentStatus == 'update') {
            leaddata[leaddata.length - 1] = "complete";
            leads[g_currentLeadid] = leaddata;

            sync();
        } else if (g_currentStatus == 'manually') {
            if (!isQuickScan) {
                saveLeadtoServer(leaddata, leads.length - 1);
            }
        }
    } catch (e) {
        checkStorageSize();
    }
}

// prepares the lead form to display the captured image
function loadImage(imgURI) {
    if (imgURI == '') {
        return;
    }

    var img = new Image();

    $(img).load(function () {
        var canvas = document.createElement('canvas');

        if (img.height > img.width) {
            canvas.height = img.width;
            canvas.width = img.height;
        } else {
            canvas.height = img.height;
            canvas.width = img.width;
        }

        var ctx = canvas.getContext("2d");

        ctx.translate(canvas.width / 2, canvas.height / 2);

        if (img.height > img.width) {
            ctx.rotate(-90 * Math.PI / 180);
        }

        ctx.drawImage(img, -(img.width / 2), -(img.height / 2));

        var aaa = canvas.toDataURL();

        var imgBizcard = document.getElementById('img_bizcard');

        imgBizcard.setAttribute('src', aaa);

        var imgsupercontainer = document.getElementById('biz-super-container');

        $("#biz-super-container").width(g_dWidth);
        $("#biz-super-container").height(g_dWidth * canvas.height / canvas.width);

        $("#img_bizcard").width(1.1 * g_dWidth);
        $("#img_bizcard").height(1.1 * g_dWidth * canvas.height / canvas.width);

        imgBizcard.style.webkitTransform = imgBizcard.style.transform = 'translate(0px, 0px)';
    }).error(function () {
        myApp.alert(i18n("Image Load Failed!"), i18n("Image Load Failed!"));
    }).attr('src', imgURI);
}

function imgZoomIn() {
    var sw = $("#biz-super-container").width();
    var sh = $("#biz-super-container").height();

    var rate = sh / sw;

    $("#img_bizcard").width($("#img_bizcard").width() * 1.2);
    $("#img_bizcard").height($("#img_bizcard").width() * rate);
}

function imgZoomOut() {
    var sw = $("#biz-super-container").width();
    var sh = $("#biz-super-container").height();

    if (sw > $("#img_bizcard").width() * 0.8)
        return;

    var rate = sh / sw;

    $("#img_bizcard").width($("#img_bizcard").width() * 0.8);
    $("#img_bizcard").height($("#img_bizcard").width() * rate);
}

function dragMoveListener(e) {
    var target = e.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0) + e.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + e.dy;

    if (x > 0)
        x = 0;

    if (y > 0)
        y = 0;

    if (x < ($("#biz-super-container").width() - $("#img_bizcard").width()))
        x = $("#biz-super-container").width() - $("#img_bizcard").width();

    if (y < ($("#biz-super-container").height() - $("#img_bizcard").height()))
        y = $("#biz-super-container").height() - $("#img_bizcard").height();

    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

function clickBtnSelectMode() {
    mainView.router.load({
        pageName: 'select-mode'
    });
}

function clickBtnGroupMode() {
    $('#group-scan-member').toggleClass('hidden', g_groupID === 0);
    mainView.router.load({
        pageName: 'group-mode'
    });
}

function getFieldName(field_id) {
    return field_id == 'Job' ? 'Title' : field_id;
}

function getFieldId(field_name) {
    return field_name == 'Title' ? 'Job' : field_name;
}

function isFieldMandatory(field_id) {
    var isFieldMandatory = false;

    for (var i = 0; i < g_profileFieldsAllTrade.length; i++) {
        var tradeshow = g_profileFieldsAllTrade[i];

        if (tradeshow.tradeshow_id == g_tradeshowId) {
            var profile = tradeshow.profile;

            for (var j = 0; j < profile.length; j++) {
                var field = profile[j];

                if (field.field_name == field_id) {
                    if (field.required) {
                        isFieldMandatory = true;
                    }

                    break;
                }
            }

            break;
        }
    }

    return isFieldMandatory;
}

function isFieldHidden(field_id) {
    var isFieldHidden = false;

    for (var i = 0; i < g_profileFieldsAllTrade.length; i++) {
        var tradeshow = g_profileFieldsAllTrade[i];

        if (tradeshow.tradeshow_id == g_tradeshowId) {
            var profile = tradeshow.profile;

            for (var j = 0; j < profile.length; j++) {
                var field = profile[j];

                if (field.field_name == field_id) {
                    if (field.hidden) {
                        isFieldHidden = true;
                    }
                    break;
                }
            }

            break;
        }
    }

    return isFieldHidden;
}


function printQuestions(data, answerId, returnString, selfRegister) {
    var questions = [];

    for (var i = 0; i < g_QAs.length; i++) {
        if (g_QAs[i].tradeshow_id == g_tradeshowId) {
            for (var j = 0; j < g_QAs[i].questions.length; j++) {
                var question = g_QAs[i].questions[j];

                if (question.answer_id == answerId) {
                    questions.push(question);
                }
            }

            break;
        }
    }

    var str = '';

    for (var i = 0; i < questions.length; i++) {
        var questionData = null;
        var question = questions[i];
        var style = '';

        if (data) {
            for (var j = 0; j < data.length; j++) {
                if (data[j].question.id == question.id) {
                    questionData = data[j];

                    break;
                }
            }
        }

        var state = questionData ? questionData.question.state : question.state;

        if (state == 'delete') {
            style = 'none';
        } else {
            style = 'block';
        }
        var isAccordion = answerId ? false : true;
        var required = question.required === 1 ? 'required' : '';
        var selfClass = selfRegister ? 'panel-opened details-section self-step ' + required : '';

        str += '<div class="panel panel-default qa_list##SELECTED_PLACEHOLDER## ' + selfClass + '" style="display:' + style + ';background:white;position:relative;width:100%;margin-top: 1px;padding-top:0px">';
        str += '<div class="panel-heading" role="tab" id="headingTwo' + question.id + '">';
        str += '<h4 class="panel-title">';

        var selfCollapse = selfRegister ? '' : 'data-toggle="collapse"';

        if (isAccordion) {
            str += '<span class="collapsed" role="button" ' + selfCollapse + ' data-parent="#accordion" href="#collapseTwo' + question.id + '" aria-expanded="false" aria-controls="collapseTwo' + question.id + '"  style="display:flex;width:100%" onClick="updatePanel( this );">';
        } else {
            str += '<i class="fa fa-arrow-right"></i>';
        }

        str += '<a class="questionname" data-question-id="' + question.id + '" style="color: #0069D2;width:95%">' + i18n(question.qtn_txt) + (question.required ? ' *' : '') + '</a>';

        if (isAccordion) {
            str += '<a class="fa fa-sort" style="color: #0069D2; width:5%"></a>';
            str += '</span>';
        }

        str += '</h4>';
        str += '</div>';

        var first_level = (answerId || !selfRegister) ? "" : "in";
        var first_class = first_level ? "first" : "";

        if (isAccordion) {
            str += '<div id="collapseTwo' + question.id + '" class="panel-collapse collapse ' + first_class + " " + first_level + '" role="tabpanel" aria-labelledby="headingTwo' + question.id + '">';
        }

        str += '<div class="panel-body">';
        str += '<ul id="answerlist' + question.id + '" style="padding-left:0px">';

        var answers = question.answers;
        var panelSelected = false;

        for (var j = 0; j < answers.length; j++) {
            var answer = answers[j];

            if (answers[j].qtn_id == question.id) {
                var answerData = questionData ? questionData.answer[j] : null;
                var styleAnswers = '';
                var checked = answerData && answerData.answervalue ? 'checked' : '';
                var answerState = answerData ? answerData.astate : answer.state;

                if (checked) {
                    panelSelected = true;
                }

                if (answerState == 'delete') {
                    styleAnswers = 'none';
                } else {
                    styleAnswers = 'block';
                }

                str += '<li style="padding-left:15px;display:' + styleAnswers + '"' + (checked ? ' class="selected"' : '') + '>';
                str += '<label class="label-checkbox item-content answerlist" style="display:flex">';
                str += '<div class="item-inner" style="width:90%">';
                str += '<div class="item-title answername" style="display:' + styleAnswers + '">' + i18n(answer.answers) + '</div>';
                str += '</div>';
                str += '<input class="checkanswerlist" id="' + question.id + '&' + answer.id + '" type="' + (question.multiple ? 'checkbox' : 'radio') + '" name="qtn_' + question.id + '" value="Books" ' + checked + ' onChange="updateInput(this);">';
                str += '<div class="item-media">';
                str += '<i class="icon icon-form-checkbox" style="border-color:#0069D2" onClick="return onRadioClick(this);"></i>';
                str += '</div>';
                str += '</label>';

                if (g_skipLogicEnabled) {
                    str += '<div class="answer-questions">';
                    str += printQuestions(data, answer.id, true);
                    str += '</div>';
                }

                str += '</li>';
                str += '<hr style="display:block">';
            }
        }

        str = str.replace('##SELECTED_PLACEHOLDER##', panelSelected ? ' selected' : '');

        var free_answer_options = null;

        if (question.free_answer_options) {
            free_answer_options = question.free_answer_options.split(',');

            free_answer_options.forEach($.trim);
        }

        str += '</ul>';
        str += '<div style="' + (question.show_free_answer ? 'padding:5px' : 'height:0;overflow:hidden;') + '">';
        str += '<textarea class="freeanswer input-primary" id="freeanswer' + question.id + '" rows="2" placeholder="' + (free_answer_options ? 'Start typing answer' : 'Add your free answer') + '" style="display:' + style + '"' + (free_answer_options ? ' onKeyUp="showResult(\'freeanswer' + question.id + '\', \'livesearch_freeanswer_' + question.id + '\', ' + JSON.stringify(free_answer_options).replace(/"/g, '&quot;') + ')"' : '') + '>' + (questionData ? questionData.question.freeanswer : '') + '</textarea>';
        str += '</div>';

        if (free_answer_options) {
            str += '<div id="livesearch_freeanswer_' + question.id + '" style="padding-left:10px"></div>';
        }

        str += '</div>';

        if (isAccordion) {
            str += '</div>';
        }

        if (selfRegister) {
            str += '<div class="details-input-wrapper form-buttons">';
            str += '<a class="form-back contr">BACK</a>';
            str += '<a class="form-next contr">NEXT</a>';
            str += '</div>';
        }

        str += '</div>';
    }

    if (returnString) {
        return str;
    } else if (selfRegister) {
        $(str).insertAfter('#profiledetail-self');
    } else {
        $(str).insertAfter('#profiledetail');
    }
}

function isQuestionMandatory(questionId) {
    var isQuestionMandatory = false;

    for (var i = 0; i < g_QAs.length; i++) {
        var tradeshow = g_QAs[i];

        if (tradeshow.tradeshow_id == g_tradeshowId) {
            var questions = tradeshow.questions;

            for (var j = 0; j < questions.length; j++) {
                var question = questions[j];

                if (question.id == questionId) {
                    if (question.required) {
                        isQuestionMandatory = true;
                    }

                    break;
                }
            }

            break;
        }
    }

    return isQuestionMandatory;
}

function takePhoto() {
    navigator.camera.getPicture(function (imageURI) {
            if (imageURI) {
                loadPhoto(imageURI);

                var ft = new FileTransfer(),
                    path = imageURI.fullPath,
                    name = g_username + imageURI.name;

                ft.upload(
                    path,
                    encodeURI(SERVER_URL + "upload-photo.php"),
                    function (result) {
                    },
                    function (error) {
                    }, {
                        fileName: name
                    });
            }
        },
        function () {
        }, {
            quality: 80,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            targetWidth: 1024,
            targetHeight: 1024
        });
}

function loadPhoto(src) {
    $('#photo').empty();

    g_photo = src;

    var image = new Image();

    image.addEventListener('load', function () {
        $('#photo').append(this);
    });

    if (src) {
        image.src = src;
    }
}

function imageToBase64(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function saveBrandingImage(brandingImageGlobalUrl, idleTime) {
    downloadBrandingImage(brandingImageGlobalUrl, false, idleTime, "image");
}

function downloadBrandingImage(imageUrl, tempTradeshow, idleTime, type = "image") {

    var newFileName = imageUrl.split('/').pop();
    var myFolderApp = g_imageFolder;

    var blob = null;
    var xhr = new XMLHttpRequest();

    xhr.open("GET", imageUrl);
    xhr.responseType = "blob";//force the HTTP response, response-type header to be blob
    xhr.onload = function()
    {
        blob = xhr.response;//xhr.response is now a blob object
        var DataBlob = blob;

        window.requestFileSystem(window.TEMPORARY, 16 * 1024 * 1024, function (fileSys) {
            fileSys.root.getDirectory(myFolderApp, {
                    create: true
                },
                function (directory) {
                    directory.getFile(newFileName, {create:true}, function(file) {
                        file.createWriter(function(fileWriter) {
                            fileWriter.write(DataBlob);

                            var images = JSON.parse(localStorage.getItem("brandingImgs"));
                            var adminid = JSON.parse(localStorage.getItem("adminemail"));
                            if (!images) {
                                var images = new Object();
                            }
                            if (!images[adminid]) {
                                images[adminid] = new Object();
                            }

                            if (tempTradeshow.id) {
                                var tradeshow_id = tempTradeshow.id;

                                if (!images[adminid][tradeshow_id]) {
                                    images[adminid][tradeshow_id] = new Object();
                                }
                                images[adminid][tradeshow_id][type] = newFileName;
                                if (type === "image") {
                                    images[adminid][tradeshow_id]['idleTime'] = tempTradeshow.branding_idle_time;
                                }
                                localStorage.setItem("brandingImgs", JSON.stringify(images));
                                // console.log('Tradeshow №' + tradeshow_id + ' branding image saved.');
                            } else {
                                var global = 'global';
                                if (!images[adminid][global]) {
                                    images[adminid][global] = new Object();
                                }
                                images[adminid][global][type] = newFileName;
                                images[adminid][global]['idleTime'] = idleTime;
                                localStorage.setItem("brandingImgs", JSON.stringify(images));
                                // console.log('Global branding image saved.');

                                showBrandingImage();
                            }

                        }, function(err){
                            // failed
                            console.log(err);
                        });
                    });
                }, resOnError);
        }, resOnError);
    }
    xhr.send();
}

function requestFilePermission() {
    var myFolderApp = g_imageFolder;
    console.log('Permissions request');

    window.requestFileSystem(window.TEMPORARY, 16 * 1024 * 1024, function (fileSys) {
        fileSys.root.getDirectory(myFolderApp, {
                create: true
            },
            function (directory) {
            });
    });
}

function updateTradeshowImage(tradeshow) {

    var tradeshows = JSON.parse(tradeshow.tradeshow);
    tradeshows = tradeshows.tradeshows;

    for (var i = 0; i < tradeshows.length; i++) {
        var tempTradeshow = tradeshows[i];

        if (
            ( typeof(tempTradeshow.branding_image) !== 'undefined') &&
            ( tempTradeshow.branding_image !== null) &&
            (tempTradeshow.branding_image != '')
        ) {
            downloadBrandingImage(SERVER_URL + tempTradeshow.branding_image, tempTradeshow, null, "image");
        }

        if (
            ( typeof(tempTradeshow.selfreg_image_start) !== 'undefined') &&
            ( tempTradeshow.selfreg_image_start !== null) &&
            (tempTradeshow.selfreg_image_start != '')
        ) {
            downloadBrandingImage(SERVER_URL + tempTradeshow.selfreg_image_start, tempTradeshow, null, "selfreg_start");
        }

        if (
            ( typeof(tempTradeshow.selfreg_image_finish) !== 'undefined') &&
            ( tempTradeshow.selfreg_image_finish !== null) &&
            (tempTradeshow.selfreg_image_finish != '')
        ) {
            downloadBrandingImage(SERVER_URL + tempTradeshow.selfreg_image_finish, tempTradeshow, null, "selfreg_finish");
        }
    }

}

function showBrandingImage() {
    var user_status = JSON.parse(localStorage.getItem("user_status"));
    var adminid = JSON.parse(localStorage.getItem("adminemail"));
    var images = JSON.parse(localStorage.getItem("brandingImgs"));
    var tradeshow_id = $("#navTitle").data('tradeshow_id');

    if (
        (typeof(mainView.activePage) !== 'undefined') &&
        ((mainView.activePage.name == "home") || (mainView.activePage.name == "self")) &&
        (typeof(images) !== 'undefined') &&
        images &&
        (typeof(images[adminid]) !== 'undefined') &&
        (typeof(images[adminid][tradeshow_id]) !== 'undefined') &&
        (typeof(images[adminid][tradeshow_id].image) !== 'undefined')
    )
    {
        var image = images[adminid][tradeshow_id].image;

        displayBrandingImage(image);

    } else if (
        (user_status != "logout" && images) &&
        ( typeof(images[adminid]) !== 'undefined') &&
        ( typeof(images[adminid]['global']) !== 'undefined') &&
        ( typeof(images[adminid]['global'].image) !== 'undefined')
    ) {
        var image = images[adminid]['global'].image;

        displayBrandingImage(image);
    }
}

function showSelfregImages() {
    var user_status = JSON.parse(localStorage.getItem("user_status"));
    var adminid = JSON.parse(localStorage.getItem("adminemail"));
    var images = JSON.parse(localStorage.getItem("brandingImgs"));
    var tradeshow_id = g_tradeshowId;
    var start_image = null;
    var finish_image = null;

    if (
        (typeof(images) !== 'undefined') &&
        images &&
        (typeof(images[adminid]) !== 'undefined') &&
        (typeof(images[adminid][tradeshow_id]) !== 'undefined')
    ) {
        if (typeof(images[adminid][tradeshow_id].selfreg_start) !== 'undefined') {
            start_image = images[adminid][tradeshow_id].selfreg_start
        }
        if (typeof(images[adminid][tradeshow_id].selfreg_finish) !== 'undefined') {
            finish_image = images[adminid][tradeshow_id].selfreg_finish
        }
    }

    displaySelfregImages(start_image, finish_image);
}

function displayBrandingImage(image) {
    console.log(image);
    var myFolderApp = g_imageFolder;

    // console.log("Image: " + image);

    window.requestFileSystem(window.TEMPORARY, 16 * 1024 * 1024, function (fs) {
        fs.root.getDirectory(myFolderApp, {
                create: true
            },
            function (directory) {
                directory.getFile(image, { create: true, exclusive: false }, function (fileEntry) {

                    var bannerImg = document.getElementById('brandingBannerImage');
                    bannerImg.src = fileEntry.toInternalURL();
                    $("#brandingBanner").show();
                    // console.log('Branding image displayed', fileEntry);

                }, resOnError);
            }, resOnError);
    }, resOnError);
}

function displaySelfregImages(start, finish) {
    var myFolderApp = g_imageFolder;

    // console.log("Image: " + image);

    window.requestFileSystem(window.TEMPORARY, 16 * 1024 * 1024, function (fs) {
        fs.root.getDirectory(myFolderApp, {
                create: true
            },
            function (directory) {
                if (start !== null) {
                    directory.getFile(start, { create: true, exclusive: false }, function (fileEntry) {
                        $(".start-section").css('background-image', 'url(' + fileEntry.toInternalURL() + ')');
                    }, resOnError);
                }
                if (finish !== null) {
                    directory.getFile(finish, { create: true, exclusive: false }, function (fileEntry) {
                        $(".end-section").css('background-image', 'url(' + fileEntry.toInternalURL() + ')');
                    }, resOnError);
                }
            }, resOnError);
    }, resOnError);
}

function timerIncrement() {

    window.idleTime = window.idleTime + 1;

    // console.log('Idle timer: ' + window.idleTime * 6 + ' seconds' );

    var user_status = JSON.parse(localStorage.getItem("user_status"));
    var adminid = JSON.parse(localStorage.getItem("adminemail"));
    var images = JSON.parse(localStorage.getItem("brandingImgs"));
    var tradeshow_id = $("#navTitle").data('tradeshow_id');
    if (
        (typeof(mainView.activePage) !== 'undefined') &&
        ((mainView.activePage.name == "home") || (mainView.activePage.name == "self")) &&
        (typeof(images) !== 'undefined') &&
        images &&
        (typeof(images[adminid]) !== 'undefined') &&
        (typeof(images[adminid][tradeshow_id]) !== 'undefined') &&
        (typeof(images[adminid][tradeshow_id]['idleTime']) !== 'undefined')
    ) {

        var imageIdleTime = images[adminid][tradeshow_id]['idleTime'];
        if (window.idleTime >= (imageIdleTime * 10) && imageIdleTime != 0) {
            showBrandingImage();
        }
    } else if (
        (user_status != "logout" && images) &&
        (typeof(images) !== 'undefined') &&
        (typeof(images[adminid]) !== 'undefined') &&
        (typeof(images[adminid]['global']) !== 'undefined') &&
        (typeof(images[adminid]['global']['idleTime']) !== 'undefined')
    ) {
        var imageIdleTime = images[adminid]['global']['idleTime'];
        if (window.idleTime >= (imageIdleTime * 10) && imageIdleTime != 0) {
            showBrandingImage();
        }
    }
}

function checkMessages() {
    $$.ajax({
        url: SERVER_URL + "get-messages.php?act=checkMessage&userid=" + g_userId,
        type: "GET",
        dataType: "json",
        success: function (results) {
            if ('undefined' !== typeof results.message) {
                localStorage.setItem("message", JSON.stringify({viewed: false, title: results.message.title, content: results.message.content}))
                showMessageNotification();
            }
        }
    });
    showMessageNotification();
}

function checkLogout() {
    $$.ajax({
        url: SERVER_URL + "get-messages.php?act=checkLogout&userid=" + g_userId,
        type: "GET",
        dataType: "json",
        success: function (results) {
            if ('undefined' !== typeof results.status && results.status === 'shutdown') {
                logout();
            }
        }
    });
    showMessageNotification();
}

function checkSync() {
    var intervalChecks = JSON.parse(localStorage.getItem("intervalChecks")) || {};
    if (intervalChecks.leadsSync === undefined)
        intervalChecks.leadsSync = {};
    for (var i = 0; i < g_tradeshows.tradeshows.length; i++) {
        var tradeshow = g_tradeshows.tradeshows[i];
        if (intervalChecks.leadsSync[tradeshow.id] === undefined) {
            intervalChecks.leadsSync[tradeshow.id] = Math.floor(new Date().getTime() / 1000);
        }
    }
    localStorage.setItem("intervalChecks", JSON.stringify(intervalChecks))

    if (g_currentTradeshow === undefined)
        return;

    var companynames = JSON.parse(localStorage.getItem("companynames")) || [];
    var temp_company;

    for (var i = 0; i < companynames.length; i++) {
        if (companynames[i].username == g_username) {
            temp_company = companynames[i];
            break;
        }
    }

    var leads = JSON.parse(localStorage.getItem("leads")) || [];
    var leadsCheck = false;

    for (var i = 0; i < leads.length; i++) {
        if (parseInt(leads[i][0].split(",")[1]) == g_tradeshowId && leads[i][leads[i].length - 1] === "complete_manually") {
            leadsCheck = true;
            break;
        }
    }

    if (
        (intervalChecks.leadsSync[g_currentTradeshow.id] + (temp_company.syncCheck * 3600)) < Math.floor(new Date().getTime() / 1000) &&
        leadsCheck &&
        parseInt(temp_company.syncCheck) > 0
    ) {
        if ($('.message-container:visible').length === 0)
            showSyncMessageContainer();
    }
}

function postponeSyncCheck(seconds) {
    var intervalChecks = JSON.parse(localStorage.getItem("intervalChecks")) || {};

    if (seconds === false)
        intervalChecks.leadsSync[g_currentTradeshow.id] = Math.floor(new Date().getTime() / 1000);
    else
        intervalChecks.leadsSync[g_currentTradeshow.id] += seconds;

    localStorage.setItem("intervalChecks", JSON.stringify(intervalChecks));
}

function showMessageNotification() {
    var message = JSON.parse(localStorage.getItem("message"));
    if (message !== null && message.viewed === false) {
        $(".message-notification").show();
    }
}

function readMessage() {
    $(".message-notification").hide();
    localStorage.setItem("message", JSON.stringify({viewed: true}))
    $$.ajax({
        url: SERVER_URL + "get-messages.php?act=read&userid=" + g_userId,
        type: "GET",
        dataType: "json",
        success: function (results) {
            console.log('Message read.')
        }
    });
}

function deleteMetadata(lead_id) {
    var metadata = JSON.parse(localStorage.getItem('metadata'));

    if (metadata && metadata[lead_id])
        delete metadata[lead_id];

    localStorage.setItem('metadata', JSON.stringify(metadata));
}

function getMetadata(lead_id, key) {
    var metadata = JSON.parse(localStorage.getItem('metadata'));
    var value = false;

    if (metadata && metadata[lead_id])
        value = metadata[lead_id][key];

    return value;
}

function setMetadata(lead_id, key, value) {
    var metadata = JSON.parse(localStorage.getItem('metadata'));

    if (!metadata)
        metadata = {};

    if (!metadata[lead_id])
        metadata[lead_id] = {};

    metadata[lead_id][key] = value;

    localStorage.setItem('metadata', JSON.stringify(metadata));
}

function updatePanel(button) {
    var panel = $(button).closest('.panel');

    if ($(button).hasClass('collapsed')) {
        panel.addClass('panel-opened');
    } else {
        panel.removeClass('panel-opened');
    }
}

function updateInput(input) {
    var ul = $(input).closest('ul');

    ul.find('> li').each(function () {
        var li = $(this);
        var input = li.find('> label > input').get(0);
        var panel = li.closest('.panel');

        if (input && input.checked) {
            li.addClass('selected');
            panel.addClass('selected');
        } else {
            setTimeout(() => {
                li.removeClass('selected');
            }, 0);
            panel.removeClass('selected');

            li.find('> .answer-questions > .panel > .panel-body > ul > li > label > input').each(function () {
                $(this).prop('checked', false);

                updateInput(this);
            });
        }
    });
}

function onRadioClick(button) {
    var input = $(button).closest('.answerlist').find('input').get(0);

    if (input && input.type == 'radio' && input.checked) {
        input.checked = false;

        updateInput(input);

        return false;
    }

    return true;
}

function updateEmailButton() {
    if (g_currentTradeshow && g_currentTradeshow.app_email_enabled) {
        $('#panel-email-all-data,#panel-email-all-data1').show();
    } else {
        $('#panel-email-all-data,#panel-email-all-data1').hide();
    }
}

var CryptoJSAesJson = {
    stringify: function (cipherParams) {
        var j = {ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};
        if (cipherParams.iv) j.iv = cipherParams.iv.toString();
        if (cipherParams.salt) j.s = cipherParams.salt.toString();
        return JSON.stringify(j);
    },
    parse: function (jsonStr) {
        var j = JSON.parse(jsonStr);
        var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(j.ct)});
        if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv)
        if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s)
        return cipherParams;
    }
}

var myApp, myApp1;

g_languages = JSON.parse(localStorage.getItem('languages'));

setLanguage(localStorage.getItem('currentLanguage'));

//Add main View
var superMainView = myApp.addView('.super-main-view', {
    dynamicNavbar: true,
    domCache: true
});

var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true,
    domCache: true
});

//search function in Leads list page
var mySearchbar = myApp.searchbar('#tradeshowsearch', {
    searchList: '.list-block-search',
    searchIn: '.item-title'
});

var mySearchbar1 = myApp.searchbar('#leadsearch', {
    searchList: '.list-block-search',
    searchIn: '.item-title'
});

var mySearchbar2 = myApp.searchbar('#usersearch', {
    searchList: '.list-block-search',
    searchIn: '.item-title'
});

myApp.onPageInit('main', function () {
    document.addEventListener("deviceready", function() {
        showBrandingImage();
    }, false);
});

window.dragMoveListener = dragMoveListener;

if (SERVER_URL.indexOf(':8080') != -1) {
    $('body').append($('<div/>')
        .css('position', 'fixed')
        .css('top', '0')
        .css('right', '0')
        .css('z-index', '9999999')
        .text(i18n('Dev app'))
    );
}

//Main menu
$$('#panel-change-tradeshow, #panel-self-back, #tradeshow-home-button').on('click', function () {
    myApp.closePanel();

    mainView.router.load({
        pageName: 'trades'
    });
});

$(document).ready(function () {
    //checking user login info.
    var user_status = JSON.parse(localStorage.getItem("user_status"));

    if (user_status == 'login') {
        loginProcess();
    } else {
        superMainView.router.load({
            pageName: 'login'
        });

        setTimeout(function(){
            requestFilePermission();
        }, 3000);


        $$('#user').val("");
        $$('#password').val("");
    }
});

function registerCaptuvo() {
    if ('undefined' !== typeof captuvo) {
        captuvo.registerScannerCallback(function (barcode) {

            console.log("Barcode scanned: " + barcode);
            $('.panel-collapse').collapse("hide");
            $('#collapseOne').collapse("show");

            if (g_captuvoBadgeScan) {
                mainView.router.load({
                    pageName: 'profile-details'
                });

                g_currentStatus = "manually";
            } else {
                g_currentStatus = "quick_scan";
            }

            initFields();

            if (g_captuvoBadgeScan) {
                mainView.router.back();
            }
            processAfterScanBarcode(barcode);

            registerCaptuvo();

            if (g_captuvoDlg !== null) {
                myApp.closeModal(g_captuvoDlg);
            }
        });

        captuvo.registerMagstripeCallback(function (track) {

            if (track.indexOf("%B") == 0) {
                track = track.split('^');

                var cc = {
                    number: track[0].substr(2), //strip leading %B
                    name: track[1].trim(),
                    expr: '20' + track[2].substr(0, 2) + '-' + track[2].substr(2, 2)
                };
            } else {

            }

        });
    }
}

function checkStorageSize() {
    javascript: var x, xLen, log=[], total=0;
    for (x in localStorage){
        if(!localStorage.hasOwnProperty(x)){continue;} xLen =  ((localStorage[x].length * 2 + x.length * 2)/1024);
        log.push(x.substr(0,30) + " = " +  xLen.toFixed(2) + " KB"); total += xLen};

    var maxSize = 4500;

    var used = total/maxSize * 100;

    //console.log(total, maxSize, used);

    if (used > 90) {
        //console.log(used.toFixed(0) + '% used, full');

        if (!window.g_deletionPromptShown) {
            myApp1.confirm(
                i18n('Clear synced leads from your device?'),
                i18n('Storage full'),
                function () {
                    window.g_deletionPromptShown = false;
                },
                function () {
                    clearLeads();

                    window.g_deletionPromptShown = false;

                    initLeadsList();
                }
            );

            window.g_deletionPromptShown = true;
        }


    } else {
        //console.log(used.toFixed(0) + '% used');
    }
}

function setLightMode() {
    var lightmode = JSON.parse(localStorage.getItem("lightmode"));
    lightmode = lightmode === null ? 'Dark' : lightmode;
    if (lightmode === 'Light') {
        $('body').addClass('darkmode');
    } else {
        $('body').removeClass('darkmode');
    }
    $(".panel-theme").html(i18n(lightmode + ' theme'));
    $(".panel-theme").attr('data-i18n-original', lightmode + ' theme');
}

function clearLeadsManual() {
    myApp1.confirm(
        i18n('Delete all synced leads?'),
        '',
        function () {},
        function () {
            clearLeads();
        }
    );
}

function clearLeads() {
    var leads = JSON.parse(localStorage.getItem("leads"));
    var tempLeads = [];

    leads.forEach(function(item) {
        var status = item[item.length - 1];
        if (status !== 'checked') {
            tempLeads.push(item);
        }
    });

    console.log(leads.length - tempLeads.length + ' leads deleted from ' + leads.length);

    localStorage.setItem("leads", JSON.stringify(tempLeads));
}

function clearAppData() {
    clearApp.prompt(
        i18n('Delete all tradeshows and leads from app? Please type DELETE if you want to proceed'),
        i18n(''),
        function (input) {
            if (input === 'DELETE') {
                localStorage.removeItem('tradeshows');
                localStorage.removeItem('leads');
                localStorage.removeItem('brandingImgs');
                localStorage.removeItem('profilefields');
                localStorage.removeItem('intervalChecks');
                window.location.reload(true);
            }
        },
        function () {}
    );
}

function addMessageContainer() {
    var messageContainer = '<div class="message-container">' +
        '<div class="message-title"></div>' +
        '<div class="message-text"></div>' +
        '<div class="view-later i18n">View later</div>' +
        '<div class="view-now i18n">Viewed</div>' +
        '</div>';
    $('.container:visible').prepend(messageContainer);
}

function showSyncMessageContainer() {
    var messageContainer = '<div class="message-container">' +
        '<div class="message-title i18n">You have unsynced leads</div>' +
        '<div class="message-text i18n">Do you want to sync now?</div>' +
        '<div class="sync-now i18n">Yes</div>' +
        '<div class="sync-later i18n">Later</div>' +
        '</div>';
    $('.container:visible').prepend(messageContainer);
    $('.message-container').show();
}

document.addEventListener("deviceready", function () {
    g_dWidth = $(window).width();
    g_dHeight = $(window).height();

    registerCaptuvo();

}, false);

document.addEventListener("captuvoConnected", function () {
    console.log("Captuvo Connected");
    g_captuvoConnected = true;

});

document.addEventListener("captuvoDisconnected", function () {
    console.log("Captuvo Disconnected");
    g_captuvoConnected = false;
    if (g_captuvoDlg !== null) {
        myApp.closeModal(g_captuvoDlg);
    }
});

document.addEventListener("resume", function () {
    // showBrandingImage();
});

document.addEventListener("deviceready", function () {
    showBrandingImage();
    // cordova.plugins.Keyboard.disableScroll(true);
});

$$('#panel-email-all-data').on('click', panelEmailAllData);
$$('#panel-email-all-data1').on('click', panelEmailAllData);

$$('#panel-edit-tradeshow').on('click', panelEditTradeshow);
$$('#panel-edit-tradeshow1').on('click', panelEditTradeshow);

$$('#panel-support').on('click', panelSupport);
$$('#panel-support1').on('click', panelSupport);

$$('#panel-privacy').on('click', panelPrivacy);
$$('#panel-privacy1').on('click', panelPrivacy);

$$('#panel-log-out, #panel-log-out1, #panel-log-out-self').on('click', panelLogout);

$$('#navMenu').on('click', function () {
    if (g_currentNavMenuState) {
        myApp.closePanel();
    } else {
        myApp.openPanel();
    }

    g_currentNavMenuState = !g_currentNavMenuState;
});

var element = document.getElementById('navbar-self');
Hammer(element).on("swiperight", function() {
    $('.navbar').css('opacity', 1);
    $('.navbar .left.sliding').css('pointer-events', 'all');
});
Hammer(element).on("swipeleft", function() {
    if (!$("#panel-self-back").is(":visible")) {
        $('.navbar').css('opacity', 0);
        $('.navbar .left.sliding').css('pointer-events', 'none');
    }
});

$$(document).on('click', '.self-step .form-next', function() {
    // profilefields required check
    if ($(this).attr('id') === 'checkProfileSelf') {
        var required_check = false;
        $('#profiledetail-self input').each(function() {
            if($(this).prop('required') && $(this).val() === ''){
                required_check = true;
                $(this).closest('div').find('p').css('color', 'red');
            }
        });
        if (!validateEmail($('#Email input').val())) {
            $('#Email p').css('color', 'red');
            required_check = true;
        }
        if (required_check) {
            return;
        }
    }
    // questions required check
    if ($(this).closest('.self-step').is('.qa_list.required')) {
        var required_check = true;
        $(this).closest('.self-step').find('input').each(function() {
            if ($(this).is(':checked')) {
                required_check = false;
            }
        });
        if (required_check) {
            $(this).closest('.self-step').find('.questionname:first-child').css('color', 'red');
            return;
        }
    }
    setTimeout(() => {
        $(this).parents('.self-step').removeClass('current');
        $(this).parents('.self-step').next('.self-step').addClass('current');
    }, 0);
    $(".page-content").scrollTop(0);
});

$$(document).on('click', '.self-step .form-back', function() {
    setTimeout(() => {
        $(this).parents('.self-step').removeClass('current');
        $(this).parents('.self-step').prev('.self-step').addClass('current');
    }, 0);
    $(".page-content").scrollTop(0);
});

//return button function on keyboard.
$("#password").keydown(loginOnEnter);
$("#user").keydown(loginOnEnter);

$('#detaillistfields').on('click', '.txt_detaillistfields', function () {
    event.preventDefault();
    //event.stopPropagation();
});

$('#profile-details-ul').on('click', '.btn-profiledetailfield', function () {
    g_currentSelectedDetailFieldID = "detailfield" + $(this).attr("id");

    var swap_field_title = $(this).closest(".item-inner").find(".item-after").text();

    $('#detaillistfieldsSwap li[value="' + swap_field_title + '"]').find('input').prop('checked', true);

    mainView.router.load({
        pageName: 'pre-profile-lists'
    });
});


$$('.pre-profile-list').on('click', function () {
    var changedFieldName = $(this).attr('value');

    if (changedFieldName == $(g_currentSelectedDetailFieldID).text()) {
        return;
    }

    for (var i = 0; i < g_profileFields.length; i++) {
        if (getFieldId($('#detailfield' + i + '').text()) == changedFieldName) {
            $('#detailfield' + i + '').text("Redefine field").css('color', '#ff9000');
        }
    }

    $("#" + g_currentSelectedDetailFieldID).text(changedFieldName).css('color', '#0069D2');

    mainView.router.back();
});

$$('#backToMode').on('click', function () {
    myApp1.confirm(
        i18n('If you close your data will be lost'),
        i18n('Save your lead data?'),
        function () {
            mainView.router.load({
                pageName: 'select-mode'
            });
            myApp.closePanel();
        },
        function () {
            saveLead();
            myApp.closePanel();
        }
    );
});

$$('#backToHome, #backToHome2, #backToHomeLinked').on('click', function () {
    mainView.router.load({
        pageName: 'home'
    });
});

$$('#btn-select-bizcard').on('click touch', function () {
    g_groupRole = "";

    mainView.router.load({
        pageName: 'profile-details'
    });

    navigator.camera.getPicture(function (imageURI) {
            movePhoto(imageURI);

            $('.collapse').collapse("hide");

            g_currentStatus = "bizcard";
            g_scanType = "business card scan";

            initFields();
        },
        function (error) {
        }, {
            quality: 100,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            targetWidth: 1024,
            targetHeight: 1024
        });
});

$$('#btn-select-manually').on('click', function () {
    $('.panel-collapse').collapse("hide");
    $('#collapseOne').collapse("show");

    mainView.router.load({
        pageName: 'profile-details'
    });

    g_currentStatus = "manually";
    g_scanType = "manual entry";
    g_onlineStatus = 'online';
    g_groupRole = "";

    initFields();
    // g_currentBarInfo = '123';
    // processBarCode();
});

$('.initial-section').on('click', function() {
    $(this).addClass('hidden');
    $('.scan-badge-section.self-step').addClass('current');

    //g_selfScanTimeout = setTimeout(function() {
    //    barcodeScanSelf()
    //}, 5000);
})

$('.end-section').on('click', function() {
    initSelfreg(g_tradeshowId);
})

// handle clicking the re-capture button (resides within the lead form itself)
$('#btn_biz_scan').on('click', function () {
    navigator.camera.getPicture(function (imageURI) {
            movePhoto(imageURI);

        },
        function () {
        }, {
            quality: 100,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            targetWidth: 1024,
            targetHeight: 1024
        });
});

$('#leadslist').on('click', '.edit', function () {
    g_currentLeadid = $(this).attr("id");

    return;
});

$('#leadslist').on('deleted', '.swipeout', function () {
    g_currentLeadid = $(this).attr("id");

    delLead(g_currentLeadid);

    return;
});

$(document).on('click', '.details-input:not(.check-input), .check-input-clickable', function(){
    var txt = $(this).text();
    $('.warning').hide();
    $('.modal-input').val("")
    $('.form-overlay:not(.error-overlay)').css('display','flex')
    clickedInput = $(this);
    clickedText = $(this).parent().find('p').text().replace(/:|\*/g,'');
    clickedValCont = $(this).parent().find('input');
    $('.modal-form-title').text('Edit '+clickedText)
    if($(this).attr('data')=='dropdown'){
        $('select.modal-input').empty()
        $('input.modal-input').hide();
        $('select.modal-input').show();
    }else{
        $('input.modal-input').val(txt).attr('placeholder', clickedText)
        $('input.modal-input').show();
        $('select.modal-input').hide();
    }
})

$('.check-input').click(function(){
    if($(this).attr('data')=='only-one'){
        $(this).closest('.details-form').find('> .details-input-wrapper .check-input, > .check-input').removeClass('filled')
    }
    if($(this).hasClass('filled')){
        $(this).removeClass('filled')
    }else{
        $(this).addClass(' filled')
    }
    if(!$(this).parent().hasClass('sub-content')){
        $('.sub-content').css('max-height','0px')
    }
    if($(this).parent().find('.sub-content').length!=0) {
        $(this).parent().find('.sub-content').css('max-height','1000px')
    }
})
$('.modal-cancel').click(function() {
    $('.form-overlay').hide();
})
$('.modal-save').click(function() {
    reqInput = $('.modal-input');
    if ($('select.modal-input').is(':visible')){
        reqInput = $('select.modal-input option:selected');
    }
    if(reqInput.val().length>0){
        clickedInput.text(reqInput.val()).addClass(' filled');
        clickedValCont.val(reqInput.val());
        $('.form-overlay:not(.error-overlay)').hide();
    }  else {
        $('.warning').show();
    }
})
$('#register-button').click(function() {
    var portfolioProducts = [];
    $(".products-row .product-card").each(function() {
        if ($(this).hasClass('active')) {
            var prod_id = $(this).data('pid');
            if (portfolioProducts.indexOf(prod_id) === -1)
                portfolioProducts.push(prod_id);
        }
    });
    saveLead(portfolioProducts);
});

$('.message-notification').on('click', function() {
    addMessageContainer();
    var message = JSON.parse(localStorage.getItem("message"));
    if (message !== null && message.viewed === false) {
        $(".message-container").show();
        $(".message-title").html(message.title);
        $(".message-text").html(message.content);
    }
});

$('body').on('click', '.view-later', function() {
    $(".message-container").remove();
});

$('body').on('click', '.view-now', function() {
    $(".message-container").remove();
    readMessage();
});

$('body').on('click', '.sync-later', function() {
    postponeSyncCheck(3600);
    $(".message-container").remove();
});

$('body').on('click', '.sync-now', function() {
    $(".message-container").remove();
    sync();
});

$('.panel-theme').click(function() {
    var lightmode = JSON.parse(localStorage.getItem("lightmode"));
    if (lightmode !== null) {
        lightmode = lightmode === 'Light' ? 'Dark' : 'Light';
        localStorage.setItem("lightmode", JSON.stringify(lightmode));
    } else {
        localStorage.setItem("lightmode", JSON.stringify('Light'));
    }
    setLightMode();
});

$$('#server-sync-btn1').on('click', function () {
    myApp.showIndicator();

    $$.ajax({
        url: SERVER_URL + "get-profile.php?userid=" + g_userId,
        type: "GET",
        dataType: "json",
        error: errorFunction,
        success: function (results) {
            if (results.status == "Success") {
                g_profileFieldsAllTrade = results.data;

                var profilefields = JSON.parse(localStorage.getItem('profilefields')) || [];

                for (var i = 0; i < profilefields.length; i++) {
                    if (profilefields[i].username == g_username) {
                        profilefields.splice(i, 1);

                        break;
                    }
                }

                profilefields.push({
                    username: g_username,
                    data: g_profileFieldsAllTrade
                });

                localStorage.setItem("profilefields", JSON.stringify(profilefields));
            }
        }
    });

    $$.ajax({
        url: SERVER_URL + "get-tradeshows.php?userid=" + g_userId,
        type: "GET",
        dataType: "json",
        error: errorFunctionNoAlert,
        success: function (results) {
            myApp.hideIndicator();

            g_tradeshows = results;

            var tradeshow = {
                username: g_username,
                tradeshow: JSON.stringify(results)
            };

            var tradeshows = JSON.parse(localStorage.getItem("tradeshows")) || [];

            for (var i = 0; i < tradeshows.length; i++) {
                if (tradeshows[i].username == g_username) {
                    tradeshows.splice(i, 1);

                    break;
                }
            }

            updateTradeshowImage(tradeshow);

            tradeshows.push(tradeshow);

            localStorage.setItem("tradeshows", JSON.stringify(tradeshows));

            initTradeShowList();

            showChart();
        }
    });

    $$.ajax({
        url: SERVER_URL + "question-update.php?userid=" + g_userId + "&answers=1",
        type: "GET",
        dataType: "json",
        error: errorFunctionNoAlert,
        success: function (results) {
            myApp.hideIndicator();

            g_QAs = JSON.parse(localStorage.getItem("questions")) || [];

            for (var i = 0; i < results.length; i++) {
                for (var j = 0; j < g_QAs.length; j++) {
                    if (g_QAs[j].tradeshow_id == results[i].tradeshow_id) {
                        g_QAs.splice(j, 1);

                        break;
                    }
                }
            }

            for (var i = 0; i < results.length; i++) {
                g_QAs.push(results[i]);
            }

            localStorage.setItem("questions", JSON.stringify(g_QAs));
        }
    });

    syncLanguages();
    checkMessages();
});

$$('#server-sync-btn').on('click', sync);

//=====business card draggable======
interact('.draggable')
    .draggable({
        inertia: true,
        restrict: {
            endOnly: true,
            elementRect: {
                top: 0,
                left: 0,
                bottom: 1,
                right: 1
            }
        },
        autoScroll: true,
        onmove: dragMoveListener,
    });

$("#brandingBanner").on('click touch touchstart', function () {
    $(this).hide();
});

$(function() {
    window.idleTime = 0;

    //Increment the idle time counter every six seconds.
    var idleInterval = setInterval(timerIncrement, 6000); // 6 seconds

    //Increment the messages time counter every 5 minutes.
    var messagesInterval = setInterval(checkMessages, 300000); // 300 seconds

    //Increment the logout time counter every 5 minutes.
    var logoutInterval = setInterval(checkLogout, 300000); // 300 seconds

    //Increment the sync time counter every 1 minute.
    var syncInterval = setInterval(checkSync, 60000); // 60 seconds

    //Zero the idle timer on mouse movement.
    $(this).mousemove(function (e) {
        window.idleTime = 0;
    });
    $(this).keypress(function (e) {
        window.idleTime = 0;
    });
    //Zero the idle timer on touch events.
    $(this).bind('touchstart', function(){
        window.idleTime = 0;
    });
    $(this).bind('touchmove', function(){
        window.idleTime = 0;
    });

    setLightMode();
    checkLogout();
    // clickBtnGroupMode();
    // selectTradeShow(1005);
});



