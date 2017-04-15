function loadTwitch(search) {
    var tCha = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "medrybw", "noobs2ninjas", "food", "brunofin", "comster404"];
    var tUrl = "https://api.twitch.tv/kraken/streams/";
    var cId = "?client_id=7l3od9sx1rsri9b30l2p9ddxibl0bk0";
    var $twitchDiv = $("#twitchDiv");
    var hNodesOff = "";
    var hNodesOn = "";
    var hNodesClosed = "";
    // var offLogo="https://cdn.tutsplus.com/ae/authors/adam-everett-miller/Aetuts_Preview_TV_Turn_Off.jpg";
    var closedLogo = "https://www.rulistings.com/Content/PlaceholderIcons/tv_placeholder.png"
    //var fcc="https://cdn.tutsplus.com/ae/authors/adam-everett-miller/Aetuts_Preview_TV_Turn_Off.jpg";
    if (search) {
        tCha = tCha.filter(streamer => streamer.toLowerCase().includes(search.toLowerCase()));
    }
    $.map(tCha, function(val, ind) {
        $.getJSON(tUrl + val + cId, function(data) {
            if (data.stream === null) {
                $.getJSON("https://api.twitch.tv/kraken/channels/" + val + cId, function(response) {
                    hNodesOff = "<div class='offarea'><a href='https://www.twitch.tv/" +
                        val + "' target='_blank'><img src='" + response.logo + "' id='offlogo'><span class='twitchTitle'>" + response.display_name +
                        "</span><span class='line' id='poff'>offline</span></div>";
                    $twitchDiv.append(hNodesOff);
                    $(".offarea:last").after($(".closedarea"));
                })
            } else {

                var preview = data.stream.preview.medium;
                var status = data.stream.channel.status;
                var onName = data.stream.channel.display_name;
                if (status.length > 32) {
                    status = status.slice(0, 33);
                    status += "..."
                }
                hNodesOn = "<div class='onarea'><a href='https://www.twitch.tv/" +
                    val + "' target='_blank'><img src='" + preview + "' id='onlogo'><span class='twitchTitle'>" + onName +
                    "</span></a><span class='line' id='onp'>online</span><p id='pstatus'>" + status + "</p></div>";
                $twitchDiv.prepend(hNodesOn);
            }

        }).fail(function() {
            hNodesClosed = "<div class='closedarea'><a href='https://www.twitch.tv/" +
                val + "' target='_blank'><img src='" + closedLogo + "' id='closedlogo'><span class='twitchTitle'>" + val +
                "</span><span class='line' id='pclosed'>channel closed</span></div>";
            $twitchDiv.append(hNodesClosed);
        })
    })

    $("#all").click(function() {
        $(".onarea").show();
        $(".offarea").show();
        $(".closedarea").show();
    })
    $("#on").click(function() {
        $(".offarea").hide();
        $(".onarea").show();
        $(".closedarea").hide();
    })
    $("#off").click(function() {
        $(".onarea").hide();
        $(".offarea").show();
        $(".closedarea").show();
    })
}
loadTwitch();

$("#twitchSearch").on("input", function() {
    $("#twitchDiv").empty();
    loadTwitch($(this).val()); //or use loadTwitch($('input').val());//---> why cannot use loadTwitch($('input:search').val());?
});
$("#form-container").on("submit", function(e) {
    e.preventDefault();
    // $("#twitchDiv").empty();
    //loadTwitch($('#twitchSearch').val());
});
