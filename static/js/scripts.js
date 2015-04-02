$(document).ready(function() {
    var db = new Firebase('https://lean-canvas.firebaseio.com/');

    $(document).foundation();

    state0(db);

    window.onpopstate = function(event) { state0(db); };

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

    $('.b-project-list').on('click', '.e-project-list-item a', function() {
        state2(db, slugy($(this).text()));

        return false;
    });

    $('.e-add-comment').click(function() {
        $(this).addClass('m-display-none');
        $(this).siblings('.e-canvas-comment').removeClass('m-display-none');
    });

    $('.b-create-canvas .e-button').click(function() {
        var id = slugy($(this).prev().val()),
            name = $(this).prev().val();

        db.child('canvas').child(id).once('value', function(snapshot) {
            var doc = {};

            if (!snapshot.val()) {
                doc.ux = '';
                doc.foes = '';
                doc.name = name;
                doc.risk = '';
                doc.costs = '';
                doc.field = '';
                doc.causes = '';
                doc.events = '';
                doc.changes = '';
                doc.metrics = '';
                doc.problem = '';
                doc.adoption = '';
                doc.approach = '';
                doc.evidence = '';
                doc.impacted = '';
                doc.mechanism = '';
                doc.partners = '';
                doc.resources = '';
                doc.activities = '';
                doc.supporters = '';
                doc.proposition = '';

                doc.ux_comments = '';
                doc.foes_comments = '';
                doc.risk_comments = '';
                doc.costs_comments = '';
                doc.field_comments = '';
                doc.causes_comments = '';
                doc.events_comments = '';
                doc.changes_comments = '';
                doc.metrics_comments = '';
                doc.problem_comments = '';
                doc.adoption_comments = '';
                doc.approach_comments = '';
                doc.evidence_comments = '';
                doc.impacted_comments = '';
                doc.mechanism_comments = '';
                doc.partners_comments = '';
                doc.resources_comments = '';
                doc.activities_comments = '';
                doc.supporters_comments = '';
                doc.proposition_comments = '';

                db.child('canvas').child(id).set(doc);

                state2(db, id, doc);

            } else {
                notify('error', 'This canvas already exists');
            }
        });

        return false;
    });

    $('.e-canvas-content, .e-canvas-comment').focus(function() {
        $(this).data('prev-val', $(this).val());
    });

    $('.e-canvas-content, .e-canvas-comment').blur(function() {
        if ($(this).data('prev-val') != $(this).val()) {
            var id = slugy($('#canvas-name').text()),
                doc = {};

            doc[$(this).attr('name')] = $(this).val();

            db.child('canvas').child(id).update(doc);

            notify('success', 'Canvas saved');
        }
    });

    // $('#edit-canvas .e-button').click(function() {
    //     var old_id = $('#canvas-name').text(),
    //         new_id = $('#edit-canvas .e-canvas-name').val(),
    //         url = location.pathname + '?user=' + new_id;


    //     db.child('canvas').child(new_id).once('value', function(snapshot) {
    //         var doc = {};

    //         if (!snapshot.val()) {
    //             doc.id = id;

    //             db.child('canvas').child(old_id).update(doc);

    //             $('#canvas-name').text(new_id);

    //             history.pushState(null, null, url);

    //             $('#edit-canvas').foundation('reveal', 'close');

    //         } else {
    //             notify('error', 'This canvas already exists');
    //         }
    //     });
    // });
});

function slugy(value) {
    var reg1 = /[\u0300-\u036F]/g; // Use XRegExp('\\p{M}', 'g');
    var reg2 = /\s+/g;

    // The "$.data('attribute')" is commonly used as a source for the
    // "value" parameter, and it will convert digit only strings to
    // numbers. The "value.toString()" call will prevent failure in
    // this case, and whenever "value" is not a string.
    //
    value = value.toString().toLowerCase().trim();

    return unorm.nfkd(value).replace(reg1, '').replace(reg2, '_');
}

function reset_all() {
    $('#canvas').addClass('m-display-none');
    $('#landing').addClass('m-display-none');
    $('.e-canvas-edit').addClass('m-display-none');
    $('.e-canvas-content').val('');
    $('.e-canvas-comment').val('').addClass('m-display-none');
    $('.e-add-comment').removeClass('display-none');
    $('#canvas-name').text('');
    $('#edit-canvas .e-canvas-name').val('');

    // history.replaceState(null, null, window.location.pathname);
}

function state0(db) {
    var canvas_id = window.location.search.slice(6).replace('/', '');

    if (!canvas_id) {
        state1(db);

    } else {
        state2(db, canvas_id);
    }
}

function state1(db) {
    reset_all();

    db.child('canvas').once('value', function(snapshot) {
        $('.b-project-list p').remove();

        for (var obj in snapshot.val()) {
            var $a = $('<a/>').attr('href', '#').text(obj),
                $p = $('<p/>').addClass('e-project-list-item');

            $('.b-project-list').append($p.append($a));
            $('.b-project-list').removeClass('m-display-none');
        }

        $('#landing').removeClass('m-display-none');
    });
}

function state2(db, id, object) {
    function setup_canvas(obj) {
        function set_data(item) {
            $('#canvas-' + item).val(obj[item]);
            $('#canvas-' + item + '-comments').val(obj[item + '_comments']);
        }

        set_data('ux');
        set_data('foes');
        set_data('risk');
        set_data('costs');
        set_data('field');
        set_data('causes');
        set_data('events');
        set_data('changes');
        set_data('metrics');
        set_data('problem');
        set_data('adoption');
        set_data('approach');
        set_data('evidence');
        set_data('impacted');
        set_data('mechanism');
        set_data('partners');
        set_data('resources');
        set_data('activities');
        set_data('supporters');
        set_data('proposition');

        $('#canvas-name').text(obj.name);
        $('#edit-canvas .e-canvas-name').val(obj.name);

        $('.e-canvas-comment.m-display-none').each(function() {
            if ($(this).val()) {
                $(this).removeClass('m-display-none');
                $(this).siblings('i').addClass('m-display-none');

            } else {
                $(this).siblings('i').removeClass('m-display-none');
            }
        });

        history.pushState(null, null, location.pathname + '?user=' + id);

        $('#canvas').removeClass('m-display-none');
    }

    reset_all();

    if (object) {
        setup_canvas(object);

    } else {
        db.child('canvas').child(id).once('value', function(snapshot) {
            if (snapshot.val()) {
                setup_canvas(snapshot.val());

            } else {
                state1(db);
            }
        });
    }
}

function notify(type, text) {
    $('.b-system-message').text(text);
    $('.b-system-message').addClass('m-visible ' + type);

    setTimeout(function() {
        $('.b-system-message').removeClass('m-visible ' + type);

    }, 2000);
}
