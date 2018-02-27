// ==UserScript==
// @name         Mangadex (shitty) Mass Uploader
// @namespace    https://github.com/LucasPratas/userscripts
// @version      1.81
// @icon         https://mangadex.com/favicon.ico
// @description  try to get green!
// @author       Xnot
// @updateURL    https://github.com/LucasPratas/userscripts/raw/master/mangadex-massuploader.user.js
// @downloadURL  https://github.com/LucasPratas/userscripts/raw/master/mangadex-massuploader.user.js
// @match        https://mangadex.com/upload/*
// @grant        none
// ==/UserScript==

function createForm() //creates mass upload form
{
    var userscriptInfo = document.createElement("div"); //info panel with userscript instructions
    userscriptInfo.classList.add("alert", "alert-info");
    userscriptInfo.setAttribute("role", "alert");
    userscriptInfo.innerHTML = "<h4>You are using Mangadex (shitty) Mass Uploader™ by Xnot</h4>" +
    "<ol><li>Insert chapter names,volume numbers, chapter numbers, and group IDs into their respective fields. Each line is one chapter" +
    "<br />Alternatively, inputing a single name/volume/groupID/non-numerical ch.number will use that for all uploads, and inputing a single numerical chapter will increment it for each upload" +
    "<br />Obviously only use those options if there is only one volume/group/if there are no special chapters in your files" +
    "<br />If you want a chapter to have an empty title or whatever leave an empty line in the respective field. Except for Group 1, every chapter MUST have a Group 1" +
    "<br />Selecting a group in the dropdown in the bottom form will give you the group IDs" +
    "<li>Check the group delay box if you feel so inclined (will apply for all uploads)" +
    "<li>Click browse and use shift/ctrl so select all files" +
    "<br />If you hover over the browse button you can check if the files are in the expected order" +
    "<li>Select language from the standard upload form below the mass upload form" +
    "<li>Click the Mass Upload button" +
    "<li>If you realized you've fucked up halfway through, just close the tab or something, cause I have no idea how to make a cancel button and Holo didn't make one for me to rip off</ol>" +
    "If there are any problems @ or pm me on Discord<br />" +
    "Update 1.70:" +
    "<ul><li>Added support for joint groups (Group 2 and Group 3 fields)</ul>" +
    "Update 1.80:" +
    "<ul><li>Changed a bunch of code from when I didn't know what I was doing (not that I do now) so that it hopefully breaks less when Holo changes stuff" +
    "<li>All fields are now textareas and are split by line instead of -," +
    "<li>All messages are no longer on a timer and are manually dismissable (messages from Holo are still on a timer)" +
    "<li>Attempting to use chapter auto-increment with a non-numerical chapter number will just use that value for all uploads instead of making all uploads NaN";
    var container = document.getElementById("content");
    container.insertBefore(userscriptInfo, container.getElementsByClassName("panel panel-default")[1]); //insert info panel

    document.getElementById("message_container").classList.replace("display-none", "display-block");

    var massUploadForm = document.createElement("form");
    container.getElementsByClassName("panel-body")[1].insertBefore(massUploadForm, document.getElementById("upload_form")); //get real upload form); //insert mass upload form
    massUploadForm.outerHTML = '<form style="margin-top: 15px;" id="mass_upload_form" method="post" class="form-horizontal" enctype="multipart/form-data">' +
'               <div class="form-group">' +
'                    <label for="manga_id" class="col-sm-3 control-label">Manga name</label>' +
'                    <div class="col-sm-9">' +
'                        <input type="text" class="form-control" title="To change the manga, go to the manga page." disabled="" value="TEST">' +
'                        <input type="hidden" id="manga_id" name="manga_id" value="47">' +
'                    </div>' +
'                </div>' +
'                <div class="form-group">' +
'                    <label for="chapter_names" class="col-sm-3 control-label">Chapter Names</label>' +
'                    <div class="col-sm-9">' +
'                        <textarea class="form-control" id="chapter_names" name="chapter_names" placeholder="nameForCh1\n' +
'nameForCh2\n' +
'nameForCh3"></textarea>' +
'                    </div>' +
'                </div>' +
'                <div class="form-group">' +
'                    <label for="volume_numbers" class="col-sm-3 control-label">Volume Numbers</label>' +
'                    <div class="col-sm-9">' +
'                        <textarea class="form-control" id="volume_numbers" name="volume_numbers" placeholder="volumeForCh1\n' +
'volumeForCh2\n' +
'volumeForCh3"></textarea>' +
'                    </div>' +
'                </div>' +
'                <div class="form-group">' +
'                    <label for="chapter_numbers" class="col-sm-3 control-label">Chapter Numbers</label>' +
'                    <div class="col-sm-9">' +
'                        <textarea class="form-control" id="chapter_numbers" name="chapter_numbers" placeholder="ch1\n' +
'ch2\n' +
'ch3"></textarea>' +
'                    </div>' +
'                </div>' +
'                <div class="form-group">' +
'                    <label for="groups_delay" class="col-sm-3 control-label">Apply groups delay</label>' +
'                    <div class="col-sm-9">   ' +
'                        <div class="checkbox">  ' +
'                            <label><input type="checkbox" name="groups_delay" id="groups_delay" value="1"> Use for new releases!</label> ' +
'                        </div>' +
'                    </div>' +
'                </div>' +
'                <div class="form-group">' +
'                    <label for="groups_id" class="col-sm-3 control-label">Groups 1</label>' +
'                    <div class="col-sm-9">   ' +
'                        <textarea class="form-control" id="groups_id" name="groups_id" placeholder="Use dropdown in the bottom form or insert group IDs (NOT NAME) here"></textarea>' +
'                    </div>' +
'                </div>' +
'                <div class="form-group">' +
'                    <label for="groups_id_2" class="col-sm-3 control-label">Groups 2</label>' +
'                    <div class="col-sm-9">   ' +
'                        <textarea class="form-control" id="groups_id_2" name="groups_id_2" placeholder="Use dropdown in the bottom form or insert group IDs (NOT NAME) here"></textarea>' +
'                    </div>' +
'                </div>' +
'                <div class="form-group">' +
'                    <label for="groups_id_3" class="col-sm-3 control-label">Groups 3</label>' +
'                    <div class="col-sm-9">   ' +
'                        <textarea class="form-control" id="groups_id_3" name="groups_id_3" placeholder="Use dropdown in the bottom form or insert group IDs (NOT NAME) here"></textarea>' +
'                    </div>' +
'                </div>' +
'                <div class="form-group">' +
'                    <label for="langs_id" class="col-sm-3 control-label">Languages</label>' +
'                    <div class="col-sm-9">   ' +
'                        <textarea class="form-control" id="langs_id" name="langs_id" disabled="true" placeholder="not implemented because no one mass uploads multiple languages, fill in the language in the bottom form instead"></textarea>' +
'                    </div>' +
'                </div>' +
'                <div class="form-group">' +
'                    <label for="files" class="col-sm-3 control-label">Files</label>' +
'                    <div class="col-sm-9">' +
'                        <div class="input-group">' +
'                            <input type="text" class="form-control" placeholder="No files selected" readonly="" disabled="">' +
'                            <span class="input-group-btn">' +
'                                <span class="btn btn-default btn-file">' +
'                                    <span class="far fa-folder-open fa-fw" aria-hidden="true" title=""></span> <span class="span-1280">Browse</span> <input type="file" name="files" id="files" multiple="">' +
'                                </span>' +
'                            </span>' +
'                        </div>' +
'                    </div>' +
'                </div>' +
'                <div class="form-group">' +
'                    ' +
'                    <div class="col-sm-12 text-right btn-toolbar">' +
'                        <button type="button" class="btn btn-success pull-right" id="mass_upload_button" data-vivaldi-spatnav-clickable="1"><span class="fas fa-upload fa-fw" aria-hidden="true" title=""></span> <span class="span-1280">Mass Upload</span></button>' +
'                    <button type="reset" class="btn btn-warning pull-right" id="mass_reset_button" data-vivaldi-spatnav-clickable="1"><span class="fas fa-trash-alt fa-fw" aria-hidden="true" title=""></span> <span class="span-1280">Reset Form</span></button></div>' +
'                </div>' +
'                <div class="form-group">' +
'                    <div class="col-sm-offset-3 col-sm-9 text-right">' +
'                        <div class="progress" style="height: 38px; display: none;">' +
'                            <div id="progressbar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" style="width: 0%;" class="progress-bar progress-bar-info"></div>' +
'                        </div>' +
'                    </div>' +
'                </div>' +
'            </form>';
    //add event listeners
    document.getElementById("groups_delay").addEventListener("click", function()
                                            {
                                                document.getElementById("group_delay").checked = this.checked;
                                            });
    document.getElementById("group_id").addEventListener("change", function()
                                                                    {
                                                                        document.getElementById("groups_id").value = this.value;
                                                                        this.previousSibling.previousSibling.childNodes[0].childNodes[1].data += " id: " + this.value;
                                                                    });
    document.getElementById("group_id_2").addEventListener("change", function()
                                                                    {
                                                                        document.getElementById("groups_id_2").value = this.value;
                                                                        this.previousSibling.previousSibling.childNodes[0].childNodes[1].data += " id: " + this.value;
                                                                    });
    document.getElementById("group_id_3").addEventListener("change", function()
                                                                    {
                                                                        document.getElementById("groups_id_3").value = this.value;
                                                                        this.previousSibling.previousSibling.childNodes[0].childNodes[1].data += " id: " + this.value;
                                                                    });
    document.getElementById("files").addEventListener("change", function()
                                                                {
                                                                    if(this.files.length == 1)
                                                                    {
                                                                        document.getElementById("files").parentNode.parentNode.previousSibling.previousSibling.value = this.files.length + " file selected";
                                                                    }
                                                                    else
                                                                    {
                                                                        document.getElementById("files").parentNode.parentNode.previousSibling.previousSibling.value = this.files.length + " files selected";
                                                                    }
                                                                    document.getElementById("mass_upload_button").focus();
                                                                });
    document.getElementById("mass_upload_button").addEventListener("click", function(event)
                                            {
                                                massUpload(event, [document.getElementById("chapter_names"), document.getElementById("volume_numbers"), document.getElementById("chapter_numbers"), document.getElementById("groups_id"), document.getElementById("groups_id_2"), document.getElementById("groups_id_3"), document.getElementById("files")]);
                                            });
}

function massUpload(event, fields)
{
    var splitFields = splitInputs(fields);
    //this if statement is getting really long
    if((splitFields[6].length == splitFields[0].length || splitFields[0].length == 1) && (splitFields[6].length == splitFields[1].length || splitFields[1].length == 1) && (splitFields[6].length == splitFields[2].length || splitFields[2].length == 1) && (splitFields[6].length == splitFields[3].length || splitFields[3].length == 1) && !splitFields[3].includes("") && (splitFields[6].length == splitFields[4].length || splitFields[4].length == 1) && (splitFields[6].length == splitFields[5].length || splitFields[5].length == 1))
    {
        uploadNext(event, splitFields, 0);
    }
    else
    {
        document.getElementById("message_container").innerHTML = "<div class='alert alert-danger text-center' style='pointer-events: auto;' role='alert'><a href='#' class='pull-right fas fa-window-close' data-dismiss='alert'></a><strong>Error:</strong> Either the amount of files does not match names, volumes, chapters, or groups, or you left the group field empty. See instructions and try again. </div>.";
        console.log(splitFields);
    }
}

function splitInputs(fields) // splits the coma separated fields into arrays
{
    var chapterNameList = fields[0].value.split("\n");
    var volumeNumberList = fields[1].value.split("\n");
    var chapterNumberList = fields[2].value.split("\n");
    var group1List = fields[3].value.split("\n");
    var group2List = fields[4].value.split("\n");
    var group3List = fields[5].value.split("\n");
    var fileList = fields[6].files;
    for(let i = 0; i < chapterNameList.length; i++)
    {
        chapterNameList[i] = chapterNameList[i].trim();
    }
    for(let i = 0; i < volumeNumberList.length; i++)
    {
        volumeNumberList[i] = volumeNumberList[i].trim();
    }
    for(let i = 0; i < chapterNumberList.length; i++)
    {
        chapterNumberList[i] = chapterNumberList[i].trim();
    }
    for(let i = 0; i < group1List.length; i++)
    {
        group1List[i] = group1List[i].trim();
    }
    for(let i = 0; i < group2List.length; i++)
    {
        group2List[i] = group2List[i].trim();
    }
    for(let i = 0; i < group3List.length; i++)
    {
        group3List[i] = group3List[i].trim();
    }
    return [chapterNameList, volumeNumberList, chapterNumberList, group1List, group2List, group3List, fileList];
}

function uploadNext(event, splitFields, i)
{
    event.preventDefault();

    var chapterNameList = splitFields[0];
    var volumeNumberList = splitFields[1];
    var chapterNumberList = splitFields[2];
    var group1List = splitFields[3];
    var group2List = splitFields[4];
    var group3List = splitFields[5];
    var fileList = splitFields[6];

    splitFormData = new FormData(); //create new form data
    splitFormData.append("manga_id", document.getElementById("manga_id").value);
    if(chapterNameList.length == 1) //equal chapter names
    {
        splitFormData.append("chapter_name", chapterNameList[0]);
    }
    else //unequal chapter names
    {
        splitFormData.append("chapter_name", chapterNameList[i]);
    }
    if(volumeNumberList.length == 1) //single volume upload
    {
        splitFormData.append("volume_number", volumeNumberList[0]);
    }
    else //multi volume upload
    {
        splitFormData.append("volume_number", volumeNumberList[i]);
    }
    if(chapterNumberList.length == 1) //sequential chapter upload
    {
        if(isNaN(parseFloat(chapterNumberList[0]))) //only use increment if is number
        {
            splitFormData.append("chapter_number", chapterNumberList[0]);
        }
        else
        {
            splitFormData.append("chapter_number", parseFloat(chapterNumberList[0]) + i);
        }
    }
    else //listed chapter upload
    {
        splitFormData.append("chapter_number", chapterNumberList[i]);
    }
    if(document.getElementById("groups_delay").checked) //if group delay
    {
        splitFormData.append("group_delay", "true");
    }
    if(group1List.length == 1) //single group1 upload
    {
        splitFormData.append("group_id", group1List[0]);
    }
    else //multi group1 upload
    {
        splitFormData.append("group_id", group1List[i]);
    }
    if(group2List.length == 1) //single group2 upload
    {
        splitFormData.append("group_id_2", group2List[0]);
    }
    else //multi group2 upload
    {
        splitFormData.append("group_id_2", group2List[i]);
    }
    if(group3List.length == 1) //single group3 upload
    {
        splitFormData.append("group_id_3", group3List[0]);
    }
    else //multi group3 upload
    {
        splitFormData.append("group_id_3", group3List[i]);
    }
    if(document.getElementById("lang_id").value == "") //I wouldn't need this if else statement if not for fucking Safari
    {
        splitFormData.append("lang_id", "1");
    }
    else
    {
        splitFormData.append("lang_id", document.getElementById("lang_id").value);
    }
    splitFormData.append("file", fileList[i]);

    //fill in bottom form so uploader can see what's being uploaded
    if(chapterNameList.length == 1)
    {
        document.getElementById("chapter_name").value = chapterNameList[0];
    }
    else
    {
        document.getElementById("chapter_name").value = chapterNameList[i];
    }
    if(volumeNumberList.length == 1)
    {
        document.getElementById("volume_number").value = volumeNumberList[0];
    }
    else
    {
        document.getElementById("volume_number").value = volumeNumberList[i];
    }
    if(chapterNumberList.length == 1)
    {
        if(isNaN(parseFloat(chapterNumberList[0])))
        {
            document.getElementById("chapter_number").value = chapterNumberList[0];
        }
        else
        {
            document.getElementById("chapter_number").value = parseFloat(chapterNumberList[0]) + i;
        }
    }
    else
    {
        document.getElementById("chapter_number").value = chapterNumberList[i];
    }
    if(group1List.length == 1)
    {
        document.getElementById("group_id").previousSibling.previousSibling.childNodes[0].innerHTML = " id: " + group1List[0];
    }
    else
    {
        document.getElementById("group_id").previousSibling.previousSibling.childNodes[0].innerHTML = " id: " + group1List[i];
    }
    if(group2List.length == 1)
    {
        document.getElementById("group_id_2").previousSibling.previousSibling.childNodes[0].innerHTML = " id: " + group2List[0];
    }
    else
    {
        document.getElementById("group_id_2").previousSibling.previousSibling.childNodes[0].innerHTML = " id: " + group2List[i];
    }
    if(group3List.length == 1)
    {
        document.getElementById("group_id_3").previousSibling.previousSibling.childNodes[0].innerHTML = " id: " + group3List[0];
    }
    else
    {
        document.getElementById("group_id_3").previousSibling.previousSibling.childNodes[0].innerHTML = " id: " + group3List[i];
    }
    document.getElementById("file").parentNode.parentNode.previousSibling.previousSibling.value = fileList[i].name;

    var j = i+1; //for printing purposes only
    var success_msg = "<div class='alert alert-success text-center' style='pointer-events: auto;' role='alert'><a href='#' class='pull-right fas fa-window-close' data-dismiss='alert'></a><strong>Success:</strong> " + j + "/" + fileList.length + " chapters have been uploaded.</div>";
    var error_msg = "<div class='alert alert-warning text-center' style='pointer-events: auto;' role='alert'><a href='#' class='pull-right fas fa-window-close' data-dismiss='alert'></a><strong>Warning:</strong> Something went wrong with your upload at " + j + "/" + fileList.length + " files. All previous files have been uploaded.</div>";
 
    var uploadButton = document.getElementById("upload_button"); //disable buttons
    uploadButton.childNodes[0].classList.replace("fa-upload", "fa-spinner");
    uploadButton.childNodes[0].classList.replace("fa-fw", "fa-pulse");
    uploadButton.childNodes[2].innerText = "Uploading...";
    uploadButton.setAttribute("disabled", "true");
    var massUploadButton = document.getElementById("mass_upload_button");
    massUploadButton.childNodes[0].classList.replace("fa-upload", "fa-spinner");
    massUploadButton.childNodes[0].classList.replace("fa-fw", "fa-pulse");
    massUploadButton.childNodes[2].innerText = "Mass Uploading: " + j + "/" + fileList.length;
    massUploadButton.setAttribute("disabled", "true");

    $.ajax({ //definitely not copypasted from holo's upload code
        url: "/ajax/actions.ajax.php?function=chapter_upload",
        type: 'POST',
        data: splitFormData,
        cache: false,
        contentType: false,
        processData: false,

        xhr: function() {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                myXhr.upload.addEventListener('progress', function(e) {
                    console.log(e);
                    if (e.lengthComputable) {
                        $('#progressbar').parent().show();
                        $('#progressbar').width((Math.round(e.loaded/e.total*100) + '%'));
                    }
                } , false);
            }
            return myXhr;
        },

        success: function (data) {
            $('#progressbar').parent().hide();
            $('#progressbar').width('0%');
            if (!data)
            {
                document.getElementById("message_container").innerHTML = success_msg;
            }
            else
            {
                document.getElementById("message_container").innerHTML = data;
            }
            i++;
            if(i < fileList.length) //upload next after 0.5 seconds
            {
                setTimeout(function(){uploadNext(event, splitFields, i);}, 500);
            }
            else
            {
                uploadButton.childNodes[0].classList.replace("fa-spinner", "fa-upload"); //enable buttons
                uploadButton.childNodes[0].classList.replace("fa-pulse", "fa-fw");
                uploadButton.childNodes[2].innerText = "Upload";
                uploadButton.removeAttribute("disabled");
                massUploadButton.childNodes[0].classList.replace("fa-spinner", "fa-upload");
                massUploadButton.childNodes[0].classList.replace("fa-pulse", "fa-fw");
                massUploadButton.childNodes[2].innerText = "Mass Upload";
                massUploadButton.removeAttribute("disabled");
                document.getElementById("upload_form").reset(); //self explanatory
                document.getElementById("mass_upload_form").reset();
            }
        },
 
        error: function(err) {
            console.error(err);
            $('#progressbar').parent().hide();
            uploadButton.childNodes[0].classList.replace("fa-spinner", "fa-upload"); //enable buttons
            uploadButton.childNodes[0].classList.replace("fa-pulse", "fa-fw");
            uploadButton.childNodes[2].innerText = "Upload";
            uploadButton.removeAttribute("disabled");
            massUploadButton.childNodes[0].classList.replace("fa-spinner", "fa-upload");
            massUploadButton.childNodes[0].classList.replace("fa-pulse", "fa-fw");
            massUploadButton.childNodes[2].innerText = "Mass Upload";
            massUploadButton.removeAttribute("disabled");
            document.getElementById("message_container").innerHTML = error_msg;
        }
    });
}

createForm();