import {copySelection} from '../document'
import {Instance} from '../setup'
import {
  getActiveElement,
  writeDataTransferToClipboard,
} from '../utils'

export async function copy(this: Instance) {
  const doc = this[Config].document
  const target = getActiveElement(doc) ?? doc.activeElement ?? doc.body

  const clipboardData = copySelection(target)

  if (clipboardData.items.length === 0) {
    return
  }

  if (
    this.dispatchUIEvent(target, 'copy', {
      clipboardData,
    }) &&
    this.config.writeToClipboard
  ) {
    await writeDataTransferToClipboard(doc, clipboardData)
  }

  return clipboardData
}
