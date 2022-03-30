import {withGroup} from "./KonvaElements/groupwrapper";
import {LayerImage} from "./KonvaElements/layerimage";
import {Textual} from "./KonvaElements/textual";
import {Video} from "./KonvaElements/video";
import {EmbeddedScreen} from "./KonvaElements/embeddedscreen";

export const ImageWithGroup = withGroup(LayerImage);
export const TextWithGroup = withGroup(Textual);
export const VideoWithGroup = withGroup(Video);
export const EmbedWithGroup = withGroup(EmbeddedScreen);
