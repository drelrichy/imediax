export async function POST(req) {
    try {
      const text = await req.text()
      // Process the webhook payload
    } catch (error) {
      return new Response(`Webhook error: ${error.message}`, {
        status: 400,
      })
    }
   
    return new Response('Success!', {
      status: 200,
    })
  }

  export async function GET(req) {
    try {
      const text = await req.text()
      // Process the webhook payload
    } catch (error) {
      return new Response(`Webhook error: ${error.message}`, {
        status: 400,
      })
    }
   
    return new Response('Success!', {
      status: 200,
    })
  }