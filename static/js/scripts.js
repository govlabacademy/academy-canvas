$(document).ready(function() {
    var db = new Firebase('https://lean-canvas.firebaseio.com/'),
        usr = window.location.search.slice(6).replace('/', '');

    $(document).foundation();

    $('.e-mainnav-trigger').click(function() {
        var $trigger = $(this);

        if($trigger.hasClass('m-nav-active')) {
            $trigger.removeClass('m-nav-active');
            $trigger.parent().parent().parent().removeClass('m-nav-active');

        } else {
            $trigger.addClass('m-nav-active');
            $trigger.parent().parent().parent().addClass('m-nav-active');
        }
    });

    $('#login').addClass('display-none');
    $('#canvas').addClass('display-none');
    $('.e-canvas-logout').addClass('display-none');


    db.child('users').once('value', function(snapshot) {
      for (var obj in snapshot.val()) {
        var $a = $('<a/>');

        $a.attr('href', window.location.pathname + '?user=' + obj);
        $a.text(snapshot.val()[obj].name);

        $('.b-offcanvas').append($a);
      }
    });

    db.onAuth(function (auth) {
        $('#login').addClass('display-none');
        $('#canvas').addClass('display-none');
        $('.e-canvas-logout').addClass('display-none');

        clear_answers();

        if (auth || usr) {
            if (auth) {
                if (!usr || usr == auth.uid) {
                    var url = window.location.pathname + '?user=' + auth.uid;

                    usr = auth.uid;

                    $('.e-canvas-textarea').prop('disabled', false);

                    history.pushState(null, null, url);
                }

                $('.e-canvas-logout').removeClass('display-none');
            }

            db.child('users').child(usr).once('value', function(snapshot) {
                function get_username() {
                    if (auth.provider == 'google') {
                      return auth.google.email;

                    } else if (auth.provider == 'twitter') {
                        return auth.twitter.id;
                    }
                }

                var data = snapshot.val(),
                    doc = {};

                if (data) {
                    $('#canvas-name').text(data.name + '\'s Canvas');
                    $('#canvas-idea').text(data.idea);
                    $('#canvas-costs').text(data.costs);
                    $('#canvas-risks').text(data.risks);
                    $('#canvas-users').text(data.users);
                    $('#canvas-impact').text(data.impact);
                    $('#canvas-theory').text(data.theory);
                    $('#canvas-metrics').text(data.metrics);
                    $('#canvas-problem').text(data.problem);
                    $('#canvas-channels').text(data.channels);
                    $('#canvas-partners').text(data.partners);
                    $('#canvas-solution').text(data.solution);
                    $('#canvas-champions').text(data.champions);
                    $('#canvas-opponents').text(data.opponents);
                    $('#canvas-competitors').text(data.competitors);
                    $('#canvas-sustainability').text(data.sustainability);

                } else if (auth) {
                    doc.name = auth[auth.provider].displayName;
                    doc.idea = '';
                    doc.costs = '';
                    doc.risks = '';
                    doc.users = '';
                    doc.impact = '';
                    doc.theory = '';
                    doc.metrics = '';
                    doc.problem = '';
                    doc.channels = '';
                    doc.partners = '';
                    doc.solution = '';
                    doc.username = get_username(auth);
                    doc.champions = '';
                    doc.opponents = '';
                    doc.competitors = '';
                    doc.sustainability = '';

                    $('#canvas-name').text(doc.name + '\'s Canvas');

                    db.child('users').child(auth.uid).set(doc);
                }

                $('#canvas').removeClass('display-none');
            });

        } else {
          $('#login').removeClass('display-none');
        }
    });

    $('.e-canvas-textarea:enabled').blur(function() {
        if (usr) {
            var doc = {};

            doc[$(this).attr('id').slice(7)] = $(this).val();

            db.child('users').child(usr).update(doc);
        }
    });

    $('.google-login').click(function() {
        db.authWithOAuthPopup('google', function(error, auth) {
            if (error) {
                $('#login').removeClass('display-none');
                $('#canvas').addClass('display-none');
                $('.e-canvas-logout').addClass('display-none');

            } else {
              clear_answers();
            }
        }, {scope: 'email'});
    });

    $('.twitter-login').click(function() {
        db.authWithOAuthPopup('twitter', function(error, auth) {
            if (error) {
                $('#login').removeClass('display-none');
                $('#canvas').addClass('display-none');
                $('.e-canvas-logout').addClass('display-none');

            } else {
              clear_answers();
            }
        });
    });

    $('.e-canvas-logout').click(function() {
        usr = '';

        db.unauth();

        $('#login').removeClass('display-none');
        $('#canvas').addClass('display-none');
        $('.e-canvas-logout').addClass('display-none');

        history.pushState(null, null, window.location.pathname);
    });
});

function clear_answers() {
    $('#canvas-name').text('Canvas');
    $('#canvas-idea').text('');
    $('#canvas-costs').text('');
    $('#canvas-risks').text('');
    $('#canvas-users').text('');
    $('#canvas-impact').text('');
    $('#canvas-theory').text('');
    $('#canvas-metrics').text('');
    $('#canvas-problem').text('');
    $('#canvas-channels').text('');
    $('#canvas-partners').text('');
    $('#canvas-solution').text('');
    $('#canvas-champions').text('');
    $('#canvas-opponents').text('');
    $('#canvas-competitors').text('');
    $('#canvas-sustainability').text('');
}
