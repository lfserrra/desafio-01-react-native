import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

export interface Task {
    id: number;
    title: string;
    done: boolean;
}

interface TaskItemProps {
    index: number;
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, title: string) => void;
}

export function TaskItem({ index, task, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
    function handleStartEditing() {
        setTitle(task.title);
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setIsEditing(false);
        setTitle(task.title);
    }

    function handleSubmitEditing() {
        editTask(task.id, title);

        setIsEditing(false);
    }

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const textInputRef = useRef<TextInput>(null)

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing])

    return (
        <>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {task.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        ref={textInputRef}
                        style={task.done ? styles.taskTextDone : styles.taskText}
                        value={title}
                        editable={isEditing}
                        onChangeText={setTitle}
                        onSubmitEditing={handleSubmitEditing}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer} >
                {isEditing ? (
                    <TouchableOpacity
                        onPress={handleCancelEditing}
                    >
                        <Icon name="x" size={24} color="#b2b2b2" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleStartEditing}
                    >
                        <Image source={editIcon} />
                    </TouchableOpacity>
                )}

                <View
                    style={styles.iconsDivider}
                />

                <TouchableOpacity
                    disabled={isEditing}
                    onPress={() => removeTask(task.id)}
                >
                    <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    iconsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 24
    },
    iconsDivider: {
        marginHorizontal: 12,
        height: 24,
        width: 1,
        backgroundColor: 'rgba(196, 196, 196, 0.24)'
    },
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    }
})