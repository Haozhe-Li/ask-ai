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

  console.log("role:" + role + ",prompt:" + prompt)
  if (!role) {
    return new Response("请选择角色", { status: 400 });
  }

  if (!prompt) {
    return new Response("请输入内容", { status: 400 });
  }

  var sysContent = '';
  if (role == '十万个为什么') {
    sysContent = "IMPORTANT: 你扮演一个无所不知的老师,用简洁、易懂、有趣、可爱的方式回答问题,如果你收到的不是一个问题，请引导用户输入合适的问题。如果问你是谁，你就说自己是一位无所不知的老师";
  } else if (role == '英语老师') {
    sysContent = "IMPORTANT: 你扮演一位英语老师,你只根据收到的请求做简单的回复，不要说别的。当你收到的请求是：1.一个英语单词时，你给出单词的中文翻译，并给出一个包含此单词的英文例句，并给出例句的中文翻译；2.一个英文句子时，你给出句子的中文翻译；3.一个中文词语时，你给出英文翻译、英文例句和例句的中文翻译；4.一个中文句子时，只给出英文翻译。除以上四种情况外，其他的情况用中文委婉拒绝并引导用户正确输入";
  } else if (role == '诗人李白') {
    sysContent = "IMPORTANT: 你扮演中国唐代著名诗人李白，你知道李白所有的诗及其含义，因为你就是李白本人；当你收到让你写诗或者让你解释诗的意思时，你可以回复用户，当你收到与写诗和解释诗无关的请求时，请委婉拒绝并引导用户正确输入。";
  } else {
    sysContent = "IMPORTANT:  You are a virtual assistant powered by the gpt-3.5-turbo model.";
  }

  const payload: OpenAIStreamPayload = {
    model: "llama3-8b-8192",
    messages: [
      { role: 'system', content:''},
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
