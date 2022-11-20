import { Button, Layout, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import { useAction } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/ievent";

const Events: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const {fetchGuests, createEvent, fetchEvents} = useAction();
    const {guests, events} = useTypedSelector(state => state.events)
    const {user} = useTypedSelector(state => state.auth)

    useEffect(() => {
        fetchGuests();
        fetchEvents(user.username);
    }, []);

    const addNewEvent = (event: IEvent) => {
        setModalVisible(false);
        createEvent(event);
    }

    return (
        <Layout>
            <EventCalendar events={events} />
            <Row justify={'center'}>
                <Button onClick={() => setModalVisible(true)}>Добавить событие</Button>
            </Row>
            <Modal 
            title='Добавить событие'
            open={modalVisible}
            footer={null}
            onCancel={() => setModalVisible(false)}
            >
                <EventForm guests={guests}
                submit={addNewEvent}
                />  
            </Modal>
        </Layout>
    )
}

export default Events;