import * as path from 'path'
import { uuid } from 'uuidv4'
import * as vscode from 'vscode'

export class VegaRenderer implements vscode.NotebookOutputRenderer {
    preloads: vscode.Uri[] = [];

    constructor(extensionPath: string) {
        this.preloads.push(vscode.Uri.file(path.join(extensionPath, 'libs', 'vega-5', 'vega.min.js')))
        this.preloads.push(vscode.Uri.file(path.join(extensionPath, 'libs', 'vega-lite-4', 'vega-lite.min.js')))
        this.preloads.push(vscode.Uri.file(path.join(extensionPath, 'libs', 'vega-embed', 'vega-embed.min.js')))
    }

    render(document: vscode.NotebookDocument, { output, mimeType }: vscode.NotebookRenderRequest): string {
        const spec = output.data[mimeType][0] as string

        const divId = uuid()

        return `
            <div id="vis-${divId}"></div>
			<script type="text/javascript">
				vegaEmbed('#vis-${divId}', ${spec});
			</script>
		`
    }
}