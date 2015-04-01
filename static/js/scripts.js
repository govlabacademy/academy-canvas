$(document).ready(function() {
    var db = new Firebase('https://lean-canvas.firebaseio.com/');
        path_usr = window.location.search.slice(6).replace('/', '');

    $(document).foundation();

    $('.e-mainnav-trigger').click(function() {
        var $trigger = $(this);

        if ($trigger.hasClass('m-nav-active')) {
            $trigger.removeClass('m-nav-active');
            $trigger.parent().parent().parent().removeClass('m-nav-active');

        } else {
            $trigger.addClass('m-nav-active');
            $trigger.parent().parent().parent().addClass('m-nav-active');
        }
    });

    $('#login').addClass('display-none');
    $('#canvas').addClass('display-none');
    $('.e-canvas-edit').addClass('display-none');
    $('.e-canvas-login').addClass('display-none');
    $('.e-canvas-logout').addClass('display-none');


    db.child('users').once('value', function(snapshot) {
        for (var obj in snapshot.val()) {
            var $a = $('<a/>');

            $a.attr('href', window.location.pathname + '?user=' + obj);
            $a.text(snapshot.val()[obj].canvas_name);

            $('.b-offcanvas').append($a);
        }
    });

    db.onAuth(function (auth) {
        var usr = path_usr;

        $('#login').addClass('display-none');
        $('#canvas').addClass('display-none');
        $('.e-canvas-edit').addClass('display-none');
        $('.e-canvas-login').addClass('display-none');
        $('.e-canvas-logout').addClass('display-none');

        clear_answers();

        if (auth || usr) {
            if (auth) {
                // TODO: remove this after team canvas.
                $('.e-canvas-textarea').prop('disabled', false);
                //

                if (!path_usr || path_usr == auth.uid) {
                    var url = window.location.pathname + '?user=' + auth.uid;

                    usr = auth.uid;
                    path_usr = auth.uid;

                    // $('.e-canvas-textarea').prop('disabled', false);

                    history.pushState(null, null, url);

                    $('.e-canvas-edit').removeClass('display-none');
                }

                $('.e-canvas-logout').removeClass('display-none');

            } else {
                $('.e-canvas-login').removeClass('display-none');
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

                    $('#canvas-name').text(data.canvas_name);
                    $('#edit-canvas .e-canvas-name').val(data.canvas_name);

                    $('#canvas').removeClass('display-none');

                } else if (path_usr == auth.uid) {
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
                    doc.canvas_name = doc.name;
                    doc.sustainability = '';

                    db.child('users').child(auth.uid).set(doc);

                    $('#canvas-name').text(doc.canvas_name);
                    $('#edit-canvas .e-canvas-name').val(doc.canvas_name);

                    $('#canvas').removeClass('display-none');
                }
            });

        } else {
            $('#login').removeClass('display-none');
        }
    });

    $('.e-canvas-textarea:enabled').focus(function() {
        var auth = db.getAuth();

        // if (auth && auth.uid == path_usr) {
        if (auth) {
            $(this).data('prev', $(this).val());
        }
    });
    $('.e-canvas-textarea:enabled').blur(function() {
        var auth = db.getAuth();

        // if (auth && auth.uid == path_usr) {
        if (auth && $(this).data('prev') != $(this).val()) {
            var doc = {};

            doc[$(this).attr('id').slice(7)] = $(this).val();

            db.child('users').child(path_usr).update(doc);

            $('.b-system-message').addClass('m-visible');

            setTimeout(function() {
                $('.b-system-message').removeClass('m-visible');

            }, 2000);
        }
    });

    $('#edit-canvas .e-button').click(function() {
        var auth = db.getAuth(),
            path = window.location.pathname + '?user=',
            data = {};

        if (auth && auth.uid == path_usr) {
            data.canvas_name = $('#edit-canvas .e-canvas-name').val();

            // TODO: Ensure name is unique.

            db.child('users').child(auth.uid).update(data);

            $('#canvas-name').text(data.canvas_name);

            // history.pushState(null, null, path + data.canvas_name);

            $('#edit-canvas').foundation('reveal', 'close');
        }
    });

    $('.google-login').click(function() {
        db.authWithOAuthPopup('google', function(error, auth) {
            if (error) {
                $('#login').removeClass('display-none');
                $('#canvas').addClass('display-none');
                $('.e-canvas').addClass('display-none');
                $('.e-canvas-login').addClass('display-none');
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
                $('.e-canvas').addClass('display-none');
                $('.e-canvas-login').addClass('display-none');
                $('.e-canvas-logout').addClass('display-none');

            } else {
              clear_answers();
            }
        });
    });

    $('.e-canvas-logout').click(function() {
        db.unauth();
        clear_answers();

        $('#login').removeClass('display-none');
        $('#canvas').addClass('display-none');
        $('.e-canvas-edit').addClass('display-none');
        $('.e-canvas-login').addClass('display-none');
        $('.e-canvas-logout').addClass('display-none');

        history.pushState(null, null, window.location.pathname);
    });

    $('.e-canvas-login').click(function() {
        $('#login').removeClass('display-none');
        $('#canvas').addClass('display-none');
        $('.e-canvas-edit').addClass('display-none');
        $('.e-canvas-login').addClass('display-none');
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
    $('#edit-canvas .e-canvas-name').val('');
}
