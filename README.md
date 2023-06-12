# RealityTalk: Real-Time Speech-Driven Augmented Presentation for AR Live Storytelling

## Paper, Video, Project Page, and Talk
https://dl.acm.org/doi/10.1145/3526113.3545702

https://arxiv.org/abs/2208.06350

https://www.youtube.com/watch?v=vfIMeICV-7c

https://ilab.ucalgary.ca/realitytalk/

https://www.youtube.com/watch?v=VkC54ZNO_HU&t=12562s

## How to run:
```
npm install
npm run spacy-install
node server.js
npm run start
```

## Future work:
1. Migrate color tracking, hand tracking, and speech recognition to the server side or web worker
2. Add a CSV reader to read mapping information from CSV files
3. Replace WebSpeech API with more robust and accurate speech recognition API such as Whisper.cpp
4. Semi-Automated suggestions for generated contents or content retrieval
  - 4.1. Add a Google Image search API to do real-time image search
  - 4.2. DALL-E or Stable Diffusion
  - 4.3. Document loaders and retrievers
5. Customizability of the presentation
6. Semantic cues from the real-time speech (not just nouns)
... and more on future work

