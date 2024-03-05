import React, {useEffect, useState} from 'react';
import {Button, Modal, Text, TextArea} from '@gravity-ui/uikit';
import Comment from '../UI/Comment/Comment';
import ActionBox from '../UI/ActionBox/ActionBox';
import './Comments.scss';
import {addComment} from "../../store/clientReducer";
import {useDispatch} from "react-redux";

const Comments = ({client}) => {
    const dispatch = useDispatch()
    const [isFormOpen, setFormOpen] = useState(false);
    const [newComment, setNewComment] = useState({
        clientId: '',
        text: ''
    })
    const toggleFormOpen = (toOpen) => {
        setFormOpen(toOpen);
    };
    const comments = client?.comments;
    return (
        <div className="box p-4 comments box-width-one-third">
            <div className="container">
                <div className="comment-body">
                    <div className="flex justify-between items-center pb-4 border-b border-neutral-200/1">
                        <div className="heading">
                            <Text variant="subheader-3">Комментарий</Text>
                        </div>
                        <Button
                            size="l"
                            className="bg-info"
                            onClick={() => {
                                toggleFormOpen(true);
                            }}
                        >
                            Добавить комментарий
                        </Button>
                        <Modal
                            open={isFormOpen}
                            onClose={() => {
                                toggleFormOpen(false);
                            }}
                        >
                            <ActionBox
                                heading="Добавить комментарий"
                                buttons={[
                                    {
                                        text: "Отменить",
                                        classList: "ml-4",
                                        view: "flat",
                                        onCLick: () => toggleFormOpen(false)
                                    },
                                    {
                                        text: "Добавить",
                                        classList: "ml-4",
                                        view: "action",
                                        onCLick: () => {
                                            if(!(newComment.clientId && newComment.text)) {
                                                return;
                                            }
                                            dispatch(addComment(newComment));
                                            toggleFormOpen(false);
                                            setNewComment({
                                                text: '',
                                                clientId: client?.id,
                                            })
                                        }
                                    },
                                ]}
                                closeForm={() => {
                                    toggleFormOpen(false);
                                }}
                            >
                                <div className="flex gap-3 mt-3">
                                    <TextArea
                                        size="xl"
                                        minRows="2"
                                        placeholder="Введите текст"
                                        note="Введите текст"
                                        value={newComment.text}
                                        onChange={(e)=> setNewComment({
                                            clientId:  client?.id,
                                            text: e?.target?.value,
                                        })}
                                    />
                                </div>
                            </ActionBox>
                        </Modal>
                    </div>
                    <div className="flex flex-col items-stretch gap-8 pt-4">
                        {comments ? (
                            comments.map((comment) => (
                                <Comment
                                    comment={comment}
                                    clientData={{
                                        name: `${client.firstName} ${client.lastName}`,
                                        avatar: client.avatar,
                                    }}
                                    key={`comment-${comment.id}`}
                                />
                            ))
                        ) : (
                            <div
                                className="box"
                                style={{
                                    width: '100%',
                                    minHeight: '200px',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <p>Loading</p>
                            </div> //TODO: preloader
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comments;
