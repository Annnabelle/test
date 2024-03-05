import React from 'react';
import {Text, UserLabel} from '@gravity-ui/uikit';
import avatar from '../../../assets/images/UserAvatar.png';
import './Comment.scss';
import {locale, dateTimeFormatOptions} from './../../../config';

const Comment = ({comment, clientData}) => {
    return (
        <div className="comment">
            <div className="user-info flex items-center justify-between">
                <UserLabel
                    avatar={clientData.avatar || ''}
                    type="person"
                    children={clientData.name}
                    hasBorder={false}
                />
                <Text variant="body-1" className="text-black/[0.5]">
                    {new Date(comment.date).toLocaleString(locale, dateTimeFormatOptions)}
                </Text>
            </div>
            <div className="message p-2 rounded-lg mt-2">
                <Text variant="body-1">{comment.text}</Text>
            </div>
        </div>
    );
};

export default Comment;
