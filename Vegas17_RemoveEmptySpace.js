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
try {
    // step through all selected video events:
    var FirstTrack = Vegas.Project.Tracks.Item(0);

    // step through all selected video events:
    for (var track in Vegas.Project.Tracks) {
        if (!track.Selected) continue;
        var tracktime = new Timecode(0);
        for (var evnt in track.Events) {
            //AdjustStartLength seems to have  suffered changes with time. For V17, if you pass true as the third argument, the adjustment works oddly.
            //If you're working with a previous version, try changing it to true.
            //Similar issue: https://www.vegascreativesoftware.info/us/forum/v6-problem-with-adjuststartlength--40984/
            evnt.AdjustStartLength(tracktime, evnt.Length, false);
            tracktime = tracktime + evnt.Length;
        }
    }
} catch (errorMsg) {
    MessageBox.Show(errorMsg, "Error", MessageBoxButtons.OK, MessageBoxIcon.Exclamation);
}
