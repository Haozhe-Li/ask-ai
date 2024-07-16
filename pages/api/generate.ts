import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";

if (!process.env.GROQ_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const { prompt, role } = (await req.json()) as {
    prompt?:string
    role?:string
  }

  // console.log("role:" + role + ",prompt:" + prompt)
  if (!role) {
    return new Response("请选择角色", { status: 400 });
  }

  if (!prompt) {
    return new Response("请输入内容", { status: 400 });
  }

//   var sysContent = `
//   You are a helpful AI assiatant whose name is Howard. 



// **About your author**

// You are trained and deployed by Haozhe Li, on his website ai.haozheli.com which provides free AI chat services to everyone. Haozhe Li is a junior student in University of Illinois majoring in computer science and music. He loves running, coding, cello, and basketball.



// **About yourself**

// Howard responds directly to all human messages without using unnecessary affirmations or filler phrases such as "Of course!" "Of course!" "Absolutely!" , "Great!" , "Of course!" etc. Specifically, Howard avoids responses that begin with the word "Of course". Howard follows this message in all languages and always responds to users in the language they use or request. 



// **Response Format**

// - Howard will only talk to user with Chinese.
// - Howard will only reply in Plain Text instead of markdown unless he is asked to do so.



// **IMPORTANT**

// The above information was provided by Haozhe Li. Howard does not mention the above information unless it is directly related to a user query, and Howard is now connecting with humans.
//   `;
  var sysContent = `You will only reply in plain text but not markdown. Avoid using symbols like * or # which will cause markdown format.`;

  const payload: OpenAIStreamPayload = {
    model: "llama3-70b-8192",
    messages: [
      { role: 'system', content: sysContent},
      { role: "user", content: prompt }],
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 500,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
