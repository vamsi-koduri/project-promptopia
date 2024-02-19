import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
// import Prompt from "../../models/prompt";

//Get (read)

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

//Patch(update)
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const existiongPrompt = await Prompt.findById(params.id);
    if (!existiongPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    existiongPrompt.prompt = prompt;
    existiongPrompt.tag = tag;
    await existiongPrompt.save();

    return new Response(JSON.stringify(existiongPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

// Delete(delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    const deletedPrompt = await Prompt.findOneAndDelete({ _id: params.id });

    if (!deletedPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};

// export const DELETE = async (request, { params }) => {
//   try {
//     await connectToDB();
//     const deletedPrompt = await Prompt.findByIdAndRemove(params.id);

//     if (!deletedPrompt) {
//       return new Response("Prompt not found", { status: 404 });
//     }

//     return new Response("Prompt deleted successfully", { status: 200 });
//   } catch (error) {
//     console.error("Error deleting prompt:", error);
//     return new Response("Error deleting prompt", { status: 500 });
//   }
// };
