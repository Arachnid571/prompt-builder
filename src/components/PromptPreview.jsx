import PromptPreview from './PromptPreview';

// Внутри PromptForm
<div className="mt-4 w-full max-w-md">
  <PromptPreview
    character={character}
    costume={costume}
    pose={pose}
    background={background}
    custom={/* значение из input "Additional details" */}
    negative=""
  />
</div>