import {withGroup} from "./KonvaElements/groupwrapper";
import {LayerImage} from "./KonvaElements/layerimage";
import {Textual} from "./KonvaElements/textual";

export const ImageWithGroup = withGroup(LayerImage);
export const TextWithGroup = withGroup(Textual);
