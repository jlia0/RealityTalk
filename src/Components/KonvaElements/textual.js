import {Label, Tag, Text} from "react-konva";
import {withGroup} from "./groupwrapper";

export function Textual(props) {
    return (
        <Label>
            <Tag fill={'#62A6BF'}/>
            <Text text={props.text}
                  fontFamily={'Helvetica'}
                  fontSize={30}
                  padding={20}
                  fill={'white'}
                  align={'center'}
                  verticalAlign={'middle'}
            />
        </Label>
    );
}



