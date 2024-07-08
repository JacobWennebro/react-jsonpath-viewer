import { PathComponent } from 'jsonpath';
import { Fragment } from 'react';

const carriageReturnTag = '£CR£';
const indentationIncrementationTag = '£INC£';
const indentationDecrementationTag = '£DEC£';
const highlightingTags = {
  start: '££TAGGED£',
  end: '£TAGGED££',
};

export const tagPartOfJsonToHighlight = (
  jsonAsObject: object,
  paths: PathComponent[][],
  traversedPath: (string | number)[] = ['$']
): string => {
  if (Array.isArray(jsonAsObject)) {
    const doesTraversingPathMatch =
      paths.filter(
        (oneOfPathsToRetrieve) =>
          oneOfPathsToRetrieve.join(',') === traversedPath.join(',')
      ).length > 0;
    const isALengthPathMatchingThisCollection =
      paths.filter(
        (oneOfPathsToRetrieve) =>
          oneOfPathsToRetrieve.join(',') ===
          [...traversedPath, 'length'].join(',')
      ).length > 0;
    return `${carriageReturnTag + indentationIncrementationTag}${
      doesTraversingPathMatch ? highlightingTags.start : ''
    }[${carriageReturnTag + indentationIncrementationTag}${jsonAsObject
      .map((item, index) =>
        tagPartOfJsonToHighlight(item, paths, [...traversedPath, index])
      )
      .join(',' + carriageReturnTag)}${
      indentationDecrementationTag + carriageReturnTag
    }]${doesTraversingPathMatch ? highlightingTags.end : ''}${
      isALengthPathMatchingThisCollection
        ? highlightingTags.start +
          '.length = ' +
          jsonAsObject.length +
          highlightingTags.end
        : ''
    }${indentationDecrementationTag}`;
  }

  if (typeof jsonAsObject === 'object') {
    const doesTraversingPathMatch =
      paths.filter(
        (oneOfPathsToRetrieve) =>
          oneOfPathsToRetrieve.join(',') === traversedPath.join(',')
      ).length > 0;
    return `${doesTraversingPathMatch ? highlightingTags.start : ''}{${
      carriageReturnTag + indentationIncrementationTag
    }${Object.keys(jsonAsObject)
      .map(
        (key) =>
          `"${key}": ${tagPartOfJsonToHighlight(
            jsonAsObject[key as keyof typeof jsonAsObject],
            paths,
            [...traversedPath, key]
          )}`
      )
      .join(',' + carriageReturnTag)}${
      indentationDecrementationTag + carriageReturnTag
    }}${doesTraversingPathMatch ? highlightingTags.end : ''}`;
  }

  const doesTraversingPathMatch =
    paths.filter(
      (oneOfPathsToRetrieve) =>
        oneOfPathsToRetrieve.join(',') === traversedPath.join(',')
    ).length > 0;

  if (typeof jsonAsObject === 'number') {
    return `${
      doesTraversingPathMatch ? highlightingTags.start : ''
    }${jsonAsObject}${doesTraversingPathMatch ? highlightingTags.end : ''}`;
  } else {
    return `"${
      doesTraversingPathMatch ? highlightingTags.start : ''
    }${jsonAsObject}${doesTraversingPathMatch ? highlightingTags.end : ''}"`;
  }
};

export const convertTaggedJsonAsReactComponent = (
  taggedJSON: string,
  color: string
) => {
  let increments = 0;
  let isBlockHighlighted = false;
  return taggedJSON.split(carriageReturnTag).map((line, index) => {
    if (line.includes(indentationIncrementationTag)) increments++;
    if (
      line.includes(highlightingTags.start + '[') ||
      line.includes(highlightingTags.start + '{')
    )
      isBlockHighlighted = true;

    const toReturn = (
      <Fragment key={`${line}-${index}`}>
        <li style={{ color: isBlockHighlighted ? color : '' }}>
          {Array.from({ length: increments }, (_, idx) => (
            <Fragment key={`space-${index}-${idx}`}>&nbsp;</Fragment>
          ))}
          {line
            .replace(new RegExp(indentationIncrementationTag, 'g'), '')
            .replace(new RegExp(indentationDecrementationTag, 'g'), '')
            .split(highlightingTags.start)
            .map((jsonPart, subIndex) => {
              const parts = jsonPart.split(highlightingTags.end);
              if (parts.length === 2) {
                return (
                  <Fragment key={`${line}-${index}-${subIndex}`}>
                    <span style={{ color }}>{parts[0]}</span>
                    {parts[1]}
                  </Fragment>
                );
              }
              return (
                <Fragment key={`${line}-${index}-${subIndex}`}>
                  {jsonPart}
                </Fragment>
              );
            })}
        </li>
      </Fragment>
    );
    if (line.includes(indentationDecrementationTag)) increments--;
    if (
      line.includes(']' + highlightingTags.end) ||
      line.includes('}' + highlightingTags.end)
    )
      isBlockHighlighted = false;
    return toReturn;
  });
};
