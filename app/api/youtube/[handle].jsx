import { useRouter } from 'next/router';

export default function handleApi(req, res) {
  const router = useRouter();
  const { handle, slug } = router.query;

  if (!handle) {
    return res.status(400).json({ error: 'Missing handle parameter' });
  }

  // Your logic based on the handle parameter
  // Example: You can process the handle and slug values here
  // and return the corresponding data

  // For demonstration purposes, let's just return the handle and slug
  res.status(200).json({ handle, slug });
}