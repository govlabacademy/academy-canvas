$(document).ready(function() {
    var db = null;

    if (location.hostname && location.hostname != 'localhost') {
        db = new Firebase('https://lean-canvas.firebaseio.com/');

    } else {
        db = new Firebase('https://lean-canvas-dev.firebaseio.com/');
    }

    state0(db);

    $(document).foundation();

    window.onpopstate = function(event) { state0(db); };

    $('.b-project-list').on('click', '.e-project-list-item span', function() {
        var id = slugy($(this).text());

        if ($(this).hasClass('locked')) {
            $('#unlock-canvas').foundation('reveal', 'open');
            $('#unlock-canvas form').data('id', id);

        } else {
            state2(db, id);
        }

        return false;
    });

    $('#unlock-canvas form').submit(function(event) {
        var id = $(this).data('id'),
            pwd = $(this).find('input').val();

        event.preventDefault();

        db.authWithPassword({email: id + '@example.com', password: pwd},
            function(error, authData) {
                if (!error) {
                    $('#unlock-canvas').foundation('reveal', 'close');
                    state2(db, id);

                } else {
                    notify('error', 'Wrong password');
                }

            }, {remember: 'none'}
        );

        return false;
    });

    $('.e-add-comment').click(function() {
        $(this).addClass('m-display-none');
        $(this).siblings('.e-canvas-comment').removeClass('m-display-none');
    });

    $('.b-create-canvas .e-button').click(function() {
        function create_canvas(db, id, uid) {
            var doc = {};

            doc.uid = uid || '';
            doc.name = name;
            doc.author = '';
            doc.one_liner = '';
            doc.location = '';

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

            doc.ux_timestamp = '';
            doc.foes_timestamp = '';
            doc.risk_timestamp = '';
            doc.costs_timestamp = '';
            doc.field_timestamp = '';
            doc.causes_timestamp = '';
            doc.events_timestamp = '';
            doc.changes_timestamp = '';
            doc.metrics_timestamp = '';
            doc.problem_timestamp = '';
            doc.adoption_timestamp = '';
            doc.approach_timestamp = '';
            doc.evidence_timestamp = '';
            doc.impacted_timestamp = '';
            doc.mechanism_timestamp = '';
            doc.partners_timestamp = '';
            doc.resources_timestamp = '';
            doc.activities_timestamp = '';
            doc.supporters_timestamp = '';
            doc.proposition_timestamp = '';

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

            doc.ux_comments_timestamp = '';
            doc.foes_comments_timestamp = '';
            doc.risk_comments_timestamp = '';
            doc.costs_comments_timestamp = '';
            doc.field_comments_timestamp = '';
            doc.causes_comments_timestamp = '';
            doc.events_comments_timestamp = '';
            doc.changes_comments_timestamp = '';
            doc.metrics_comments_timestamp = '';
            doc.problem_comments_timestamp = '';
            doc.adoption_comments_timestamp = '';
            doc.approach_comments_timestamp = '';
            doc.evidence_comments_timestamp = '';
            doc.impacted_comments_timestamp = '';
            doc.mechanism_comments_timestamp = '';
            doc.partners_comments_timestamp = '';
            doc.resources_comments_timestamp = '';
            doc.activities_comments_timestamp = '';
            doc.supporters_comments_timestamp = '';
            doc.proposition_comments_timestamp = '';

            db.child('canvas').child(id).set(doc);

            state2(db, id, doc);
        }

        var id = slugy($(this).prev().prev().prev().val()),
            name = $(this).prev().prev().prev().val(),
            pwd1 = $(this).prev().prev().val(),
            pwd2 = $(this).prev().val(),
            mail = id + '@example.com';

        if (pwd1 === pwd2) {
            db.child('canvas').child(id).once('value', function(snapshot) {
                var doc = {};

                if (!snapshot.val()) {
                    if (pwd1.length) {
                        db.createUser({email: mail, password: pwd1},
                            function(error, userData) {
                                if (!error) {
                                    create_canvas(db, id, userData.uid);
                                }
                            }
                        );

                    } else {
                        create_canvas(db, id);
                    }

                } else {
                    notify('error', 'This canvas already exists');
                }
            });

        } else {
            notify('error', 'Passwords don\'t match');
        }

        return false;
    });

    $('.e-canvas-content, .e-canvas-comment').focus(function() {
        $(this).data('prev-val', $(this).val());
    });

    $('.e-canvas-content, .e-canvas-comment, .e-canvas-descriptions').blur(
        function() {
            var $inp = $(this);

            if ($inp.data('prev-val') != $inp.val()) {
                var id = slugy($('#canvas-name').text()),
                    doc = {};

                doc[$inp.attr('name')] = $inp.val();
                doc[$inp.attr('name') + '_timestamp'] = new Date();

                db.child('canvas').child(id).update(doc);

                notify('success', 'Canvas saved');
            }

            if ($inp.hasClass('e-canvas-comment') && !$inp.val()) {
                $inp.addClass('m-display-none');
                $inp.siblings('.e-add-comment').removeClass('m-display-none');
            }
        }
    );

    $('.e-canvas-edit').click(function() {
        $('#edit-canvas').foundation('reveal', 'open');
    });

    $('#edit-canvas form').submit(function() {
        var cnvs_id = slugy($('#canvas-name').text()),
            mailbox = cnvs_id + '@example.com',
            old_pwd = $(this).find('[name="old_pwd"]').val(),
            new_pwd = $(this).find('[name="new_pwd"]').val(),
            confirm = $(this).find('[name="confirm"]').val(),
            updates = {};

        if (new_pwd === confirm) {
            if (new_pwd === old_pwd) {
                $('#edit-canvas').foundation('reveal', 'close');
                $('#edit-canvas form')[0].reset();

            } else if (new_pwd.length) {
                if (old_pwd.length) {
                    updates.email = mailbox;
                    updates.oldPassword = old_pwd;
                    updates.newPassword = new_pwd;

                    db.changePassword(updates, function(error) {
                        if (error === null) {
                            $('#edit-canvas').foundation('reveal', 'close');
                            $('#edit-canvas form')[0].reset();

                            notify('success', 'Canvas saved');

                        } else {
                            notify('error', 'Error changing password');
                        }
                    });

                } else {
                    updates.email = mailbox;
                    updates.password = new_pwd;

                    db.createUser(updates, function(error, userData) {
                        if (!error) {
                            var doc = {};

                            doc.uid = userData.uid;

                            db.child('canvas').child(cnvs_id).update(doc);

                            $('#edit-canvas').foundation('reveal', 'close');
                            $('#edit-canvas form')[0].reset();

                            notify('success', 'Canvas saved');
                        }
                    });
                }

            } else {
                updates.email = mailbox;
                updates.password = old_pwd;

                db.removeUser(updates, function(error) {
                    if (error === null) {
                        db.child('canvas').child(cnvs_id).update({uid: ''});

                        $('#edit-canvas').foundation('reveal', 'close');
                        $('#edit-canvas form')[0].reset();

                        notify('success', 'Canvas saved');

                    } else {
                        notify('error', 'Error changing password');
                    }
                });
            }

        } else {
            notify('error', 'Passwords don\'t match');
        }

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

        return false;
    });
});

function notify(type, text) {
    $('.b-system-message').text(text);
    $('.b-system-message').addClass('m-visible ' + type);

    setTimeout(function() {
        $('.b-system-message').removeClass('m-visible ' + type);

    }, 2000);
}

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
    $('#canvas-name').text('');
    $('.e-canvas-descriptions').val('');
    $('.e-canvas-edit').addClass('m-display-none');
    $('.e-add-comment').removeClass('display-none');
    $('.e-canvas-content').val('');
    $('.e-canvas-comment').val('').addClass('m-display-none');
    $('.e-canvas-timestamp').addClass('m-display-none');
    $('#unlock-canvas input').val('');
    $('#unlock-canvas form').data('id', '');
    $('.e-canvas-timestamp .e-action').text('');
    $('.e-canvas-timestamp .e-timeago').text('').attr('title', '');
    $('#edit-canvas form')[0].reset();

    history.replaceState(null, null, window.location.pathname);
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
    db.unauth();

    db.child('canvas').once('value', function(snapshot) {
        $('.b-project-list p').remove();

        for (var oid in snapshot.val()) {
            var obj = snapshot.val()[oid],
                $p = $('<p/>').addClass('e-project-list-item'),
                $span = $('<span/>').attr('href', '#').text(obj.name);

            if (obj.uid) {
                $span.addClass('locked');
            }

            $('.b-project-list').append($p.append($span));
            $('.b-project-list').removeClass('m-display-none');
        }

        $('#landing').removeClass('m-display-none');
    });
}

function state2(db, id, object) {
    function setup_canvas(obj) {
        function set_data(item) {
            var t01 = obj[item + '_timestamp'] || '',
                t02 = obj[item + '_comments_timestamp'] || '',
                t03 = '',
                txt = '';

            if (t01 && !t02) {
                t03 = t01;
                txt = 'Edited ';

            } else if (!t01 && t02) {
                t03 = t02;
                txt = 'Commented ';

            } else if (t01 && t02) {
                t03 = new Date(t01) > new Date(t02) ? t01 : t02;
                txt = new Date(t01) > new Date(t02) ? 'Edited ' : 'Commented ';
            }

            $('#canvas-' + item).val(obj[item]);
            $('#canvas-' + item + '-comments').val(obj[item + '_comments']);
            $('#canvas-' + item + '-timestamp .e-action').text(txt);
            $('#canvas-' + item + '-timestamp .e-timeago').attr('title', t03);
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
        $('#canvas-author').val(obj.author);
        $('#canvas-one-liner').val(obj.one_liner);
        $('#canvas-location').val(obj.location);
        $('#edit-canvas .e-canvas-name').val(obj.name);

        $('.e-canvas-comment.m-display-none').each(function() {
            if ($(this).val()) {
                $(this).removeClass('m-display-none');
                $(this).siblings('i').addClass('m-display-none');

            } else {
                $(this).siblings('i').removeClass('m-display-none');
            }
        });

        $('.e-canvas-timestamp.m-display-none').each(function() {
            if ($(this).children('.e-action').text().length) {
                $(this).removeClass('m-display-none');
            }
        });

        history.pushState(null, null, location.pathname + '?user=' + id);

        $('.e-canvas-edit').removeClass('m-display-none');
        $('.e-canvas-timestamp .e-timeago').timeago();
        $('#canvas').removeClass('m-display-none');
    }

    var usr = db.getAuth();

    reset_all();

    if (object) {
        if (!object.uid || (usr && object.uid == usr.uid)) {
            setup_canvas(object);

        } else {
            state1(db);
        }

    } else {
        db.child('canvas').child(id).once('value', function(snapshot) {
            var object = snapshot.val();

            if (snapshot.val()) {
                if (!object.uid || (usr && object.uid == usr.uid)) {
                    setup_canvas(object);

                } else {
                    state1(db);
                }

            } else {
                state1(db);
            }
        });
    }
}
