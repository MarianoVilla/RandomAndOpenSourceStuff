/** 
* Program: 
* Description: This script will Delete Empty Space Between Events In Selected Tracks
* Author: Philip
* 
* Date: August 31, 2003 
**/ 

import System.Windows.Forms;
import Microsoft.Win32;
//2020 UPDATE for Vegas 17. Replaced the old Sony.Vegas import for this, where the Timecode seems to live now.
import ScriptPortal.Vegas;

//time intervals for split events.

try
{
// step through all selected video events:
var FirstTrack = Vegas.Project.Tracks.Item(0);

// step through all selected video events:
for (var track in Vegas.Project.Tracks) {
if( !track.Selected) continue;
var tracktime = new Timecode(0);
for (var evnt in track.Events) {
evnt.AdjustStartLength(tracktime,evnt.Length,true);
tracktime = tracktime + evnt.Length;
}
}
}

catch (errorMsg)
{
MessageBox.Show(errorMsg, "Error", MessageBoxButtons.OK, MessageBoxIcon.Exclamation);
}
