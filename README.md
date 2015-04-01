# GovLab Canvas

## Spec update
- Let's take out the login thing. 
- Landing page shows a list of all the canvas and a buttom to create one.
- Everyone can edit everything.
- The "create canvas" button activates a window to add a canvas name (check if unique)
- Renders a blank canvas with a unique URL ( suggestion: canvas.govlab.org/project-name )
- User fills in his info in the boxes (content editable)
- the URL shows the canvas information. (Always editable for now)
- comments section for each canvas page. Anyone can comment on anything
- autosave, instead of save button (status message to inform the user that it is saved)

## Nice to have
- print CSS for Letter-sized paper (multipage)
- markdown support



# Old Specs

## Basic Usage (CORE)

- User registers (oAuth - google>twitter>facebook>github) - https://www.firebase.com/docs/web/guide/login/github.html
- Renders a blank canvas with a unique URL ( suggestion: canvas.govlab.org/username )
- User fills in his info in the boxes (content editable)
- the URL shows the canvas information. If logged in, contenteditable is enable
- one URL (canvas.govlab.org/list), that lists all the links to all the canvases. This is for the course admin.

## Nice to have

- print CSS for Letter-sized paper (multipage)
- comments section for each canvas page. Initially, anyone can comment.*
- after register, system fires an email with the canvas URL
- markdown support
- autosave, instead of save button (status message to inform the user that it is saved)
- UNDO button (inbox style)


#### (*)Comments

The comments section is intended for coaches to provide feedback on the different answers on teh canvas. Initially we will just have a comments section, open to anyone. If later on, we feel the need to restrict this comments to coaches only, we create this feature.  
