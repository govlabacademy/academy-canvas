$(document).ready(function() {
    var db = new Firebase('https://lean-canvas.firebaseio.com/'),
        canvas_id = window.location.search.slice(6).replace('/', '');

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

    if (!canvas_id) {
        state1(db);

    } else {
        state2(db, canvas_id);
    }

    $('.b-project-list').on('click', '.e-project-list-item a', function() {
        state2(db, $(this).text());
    });

    $('.e-add-comment').click(function() {
        $(this).addClass('m-display-none');
        $(this).siblings('.e-canvas-comment').removeClass('m-display-none');
    });

    $('.b-create-canvas .e-button').click(function() {
        var id = $(this).prev().val();

        db.child('canvases').child(id).once('value', function(snapshot) {
            var doc = {},
                url = location.pathname + '?user=';


            if (!snapshot.val()) {
                doc.ux = '';
                doc.foes = '';
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

                db.child('canvases').child(id).set(doc);

                state0();

                $('#canvas-name').text(id);
                $('#edit-canvas .e-canvas-name').val(id);

                history.pushState(null, null, url + id);

                $('#canvas').removeClass('m-display-none');

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
            var doc = {};

            doc[$(this).attr('name')] = $(this).val();

            db.child('canvases').child($('#canvas-name').text()).update(doc);

            notify('success', 'Canvas saved');
        }
    });

    // $('#edit-canvas .e-button').click(function() {
    //     var old_id = $('#canvas-name').text(),
    //         new_id = $('#edit-canvas .e-canvas-name').val(),
    //         url = location.pathname + '?user=' + new_id;


    //     db.child('canvases').child(new_id).once('value', function(snapshot) {
    //         var doc = {};

    //         if (!snapshot.val()) {
    //             doc.id = id;

    //             db.child('canvases').child(old_id).update(doc);

    //             $('#canvas-name').text(new_id);

    //             history.pushState(null, null, url);

    //             $('#edit-canvas').foundation('reveal', 'close');

    //         } else {
    //             notify('error', 'This canvas already exists');
    //         }
    //     });
    // });
});

function reset_inputs() {
    $('.e-canvas-content').val('');
    $('.e-canvas-comment').val('').addClass('m-display-none');
    $('.e-add-comment').removeClass('display-none');
    $('#canvas-name').text('Canvas');
    $('#edit-canvas .e-canvas-name').val('');
}

function state0() {
    $('#canvas').addClass('m-display-none');
    $('#landing').addClass('m-display-none');
    $('.e-canvas-edit').addClass('m-display-none');

    reset_inputs();
}

function state1(db) {
    state0();

    db.child('canvases').once('value', function(snapshot) {
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

function state2(db, id) {
    state0();

    db.child('canvases').child(id).once('value', function(snapshot) {
        var data = snapshot.val();

        if (data) {
            $('#canvas-ux').val(data.ux);
            $('#canvas-foes').val(data.foes);
            $('#canvas-risk').val(data.risk);
            $('#canvas-costs').val(data.costs);
            $('#canvas-field').val(data.field);
            $('#canvas-causes').val(data.causes);
            $('#canvas-events').val(data.events);
            $('#canvas-changes').val(data.changes);
            $('#canvas-metrics').val(data.metrics);
            $('#canvas-problem').val(data.problem);
            $('#canvas-adoption').val(data.adoption);
            $('#canvas-approach').val(data.approach);
            $('#canvas-evidence').val(data.evidence);
            $('#canvas-impacted').val(data.impacted);
            $('#canvas-mechanism').val(data.mechanism);
            $('#canvas-partners').val(data.partners);
            $('#canvas-resources').val(data.resources);
            $('#canvas-activities').val(data.activities);
            $('#canvas-supporters').val(data.supporters);
            $('#canvas-proposition').val(data.proposition);

            $('#canvas-ux-comments').val(data.ux_comments);
            $('#canvas-foes-comments').val(data.foes_comments);
            $('#canvas-risk-comments').val(data.risk_comments);
            $('#canvas-costs-comments').val(data.costs_comments);
            $('#canvas-field-comments').val(data.field_comments);
            $('#canvas-causes-comments').val(data.causes_comments);
            $('#canvas-events-comments').val(data.events_comments);
            $('#canvas-changes-comments').val(data.changes_comments);
            $('#canvas-metrics-comments').val(data.metrics_comments);
            $('#canvas-problem-comments').val(data.problem_comments);
            $('#canvas-adoption-comments').val(data.adoption_comments);
            $('#canvas-approach-comments').val(data.approach_comments);
            $('#canvas-evidence-comments').val(data.evidence_comments);
            $('#canvas-impacted-comments').val(data.impacted_comments);
            $('#canvas-mechanism-comments').val(data.mechanism_comments);
            $('#canvas-partners-comments').val(data.partners_comments);
            $('#canvas-resources-comments').val(data.resources_comments);
            $('#canvas-activities-comments').val(data.activities_comments);
            $('#canvas-supporters-comments').val(data.supporters_comments);
            $('#canvas-proposition-comments').val(data.proposition_comments);

            $('#canvas-name').text(id);
            $('#edit-canvas .e-canvas-name').val(id);

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

        } else {
            state1(db);
        }
    });
}

function notify(type, text) {
    $('.b-system-message').text(text);
    $('.b-system-message').addClass('m-visible ' + type);

    setTimeout(function() {
        $('.b-system-message').removeClass('m-visible ' + type);

    }, 2000);
}
