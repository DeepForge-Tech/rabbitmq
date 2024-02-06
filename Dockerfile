FROM rabbitmq:3.8.0-management

COPY rabbitmq.conf /etc/rabbitmq/

ENV RABBITMQ_NODENAME=rabbit@rabbitmq-0g41.onrender.com

RUN chown rabbitmq:rabbitmq /etc/rabbitmq/rabbitmq.conf
RUN rabbitmq-plugins enable --offline rabbitmq_mqtt rabbitmq_federation_management rabbitmq_stomp
USER rabbitmq:rabbitmq
EXPOSE 5672
EXPOSE 15672
