import {helper} from '@ember/component/helper';

export default helper(([snapshotId, selectedWidth, comparisonMode, isFullscreen]) => {
  let location = window.location;
  comparisonMode = comparisonMode || 'diff';
  if (isFullscreen) {
    return location.href;
  } else {
    // The whitespace created by deconstructing this on multiple lines is dangerous.
    // prettier-ignore
    // eslint-disable-next-line max-len
    return `${location.origin}${location.pathname}/view/${snapshotId}/${selectedWidth}?mode=${comparisonMode}&snapshot=${snapshotId}`;
  }
});
