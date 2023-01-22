import { StatusBar } from 'expo-status-bar';
import React, {FC} from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';



interface Message {
  id: string;
  text: string;
  isSentByMe: boolean;
}



  const App: FC = () => {
  const [messages, setMessages] = React.useState<Message[]>([
    {isSentByMe: true, text:'hi', id: 'uydx'},
    {isSentByMe: false, text:'hi', id: 'usytdx'},
    {isSentByMe: true, text:'hi', id: 'uytfdx'},
    {isSentByMe: true, text:'hi', id: 'uytdgx'},
    {isSentByMe: false, text:'hi', id: 'uytdhx'},
  ]);
  const [inputText, setInputText] = React.useState('');

  async function onSubmit(event: string, chatLog: Message[]) {
    // event.preventDefault();
    console.log('this is the sent text', event)
    try {
      const response = await fetch("https://demo.dornaglobal.com/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      const data = await response.json()
      console.log('the response: ', data)
      const prevMessage = 
      setMessages([...chatLog, { id: new Date().toISOString()+"hi", text: data?.result[0]?.text , isSentByMe: false }]);
      //   const data = await JSON.stringify(response, null, 4);
      if (response.status !== 200) {
        throw data || new Error(`Request failed with status ${response.status}`);
      }
    //   console.log('this is the result:', data)
      // setResult(data.result);
      // setAnimalInput("");
    } catch(error:any) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(`error bro: ${error}`);
    }
  }

  const handleSendMessage = async () => {
  //  setMessages([...messages, { id: new Date().toISOString(), text: inputText, isSentByMe: true }]);
   setInputText('');
   let newMessages = [...messages, { id: new Date().toISOString(), text: inputText, isSentByMe: true }].map(message => message.text).join('\n')
   let chatLog =  [...messages, { id: new Date().toISOString(), text: inputText, isSentByMe: true }]
    
  onSubmit(newMessages, chatLog)
    
  };

  return (
    
    <View className='flex-1 pt-8'>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            
            className={`p-2 rounded-lg my-4 max-w-[90%] ${item.isSentByMe ? "bg-blue-500 self-end":"bg-gray-500 self-start"}`}
          >
            <Text className='text-white'>{item.text}</Text>
          </View>
        )}
      />
      <View className={'p-2 bg-gray-200 flex-row items-center'}>
        <TextInput
          className={'p-2 bg-white rounded-lg flex-1'}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message here"
          multiline
        />
        <View className={'p-2'}>
          <Pressable onPress={handleSendMessage}>
            <Text>
              Send
            </Text>
            </Pressable>
        </View>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App