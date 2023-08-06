import React from "react"
import { DropdownMenuProps } from "./types"
import { styles } from "./styles"
import Animated from "react-native-reanimated"
import { Modal, ScrollView } from "react-native"

const OverlayDropdown = (props: DropdownMenuProps) => {
    const { header, children, footer, renderItem, data, modalProps, dropdownTopPosition } = props;
   // console.log('dropdownTopPosition',dropdownTopPosition);
    
    return (
        modalProps.visible === true &&
        <Animated.View style={styles({top: dropdownTopPosition}).overlayContainer}>
            {header && header}
            {
                (data && renderItem()) && 
                <ScrollView>
                    {
                        data.map((item, index) => {
                            return renderItem({item, index})
                        })
                    }
                </ScrollView>
            }
            {children && children}
            {footer && footer}
        </Animated.View>
    )
}

const ModalDropdown = (props: DropdownMenuProps) => {
    const { header, children, footer, renderItem, modalProps, data } = props;

    return (
        <Modal {...modalProps}>
            <Animated.View>
                {header && header}
                {
                    (data && renderItem()) && 
                    <ScrollView>
                        {
                            data.map((item, index) => {
                                return renderItem({item, index})
                            })
                        }
                    </ScrollView>
                }
                {children && children}
                {footer && footer}
            </Animated.View>
        </Modal>
    )
}

const DropdownMenu = (props: DropdownMenuProps) => {
    const { present } = props;

    return (
        present === 'modal'
        ? 
            <ModalDropdown {...props} />
        :
            <OverlayDropdown {...props} />
    )
}

export default DropdownMenu