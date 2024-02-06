FROM rabbitmq:latest

COPY rabbitmq.conf /etc/rabbitmq/

ENV RABBITMQ_NODENAME=rabbit@0.0.0.0

RUN chown rabbitmq:rabbitmq /etc/rabbitmq/rabbitmq.conf
# RUN rabbitmq-plugins enable --offline rabbitmq_mqtt rabbitmq_federation_management rabbitmq_stomp
USER rabbitmq:rabbitmq
EXPOSE 5672
EXPOSE 15672
