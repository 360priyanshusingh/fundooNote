const amqplib = require('amqplib');

export const connectRabbitMqQueue = async(data)=>{
  try {
       
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue("Note_Queue");

    // setInterval(()=>{
    //   channel.sendToQueue("Note_Queue",Buffer.from('RabbitMq is called '))
    // },1000);
   
    const messageBuffer = Buffer.from(JSON.stringify(data));
    channel.sendToQueue("Note_Queue",messageBuffer)
    console.log("Message sent by the RabbitMq: %s");
    return { success: true};

  } catch (error) {
    console.log(error)
    console.error("Error sending email by RabbitMQ:", error);
    return { success: false};

  }

}
export const consumeRabbitMqQueue = async()=>{
  try {
       
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue("Note_Queue");

    channel.consume("Note_Queue", (msg) => {
      if (msg !== null) {
        console.log(msg.content.toString());
        channel.ack(msg);
      } else {
        console.log('Consumer cancelled by server');
      }
    });

  } catch (error) {
    console.log(error)
    
  }

}

