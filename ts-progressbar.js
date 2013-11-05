function ProgressBar(options) {
	var container,
		stretch,
		progressBar,
		label;

	var color;
	var round;
	var finishedText;
	var progress;

	if (options.container == undefined || options.container == null || options.container.tagName !== 'DIV') {
		throw 'Progress bar requires a div be specified as the container.';
	}
	container = options.container;

	if (options.color == undefined || typeof(options.color) != 'string') {
		color = '#ffffff';
	}
	if (options.background == undefined || typeof(options.background) != 'string') {
		background = '#333333';
	}

	if (options.round == undefined || typeof(options.round) != 'number') {
		round = 0;
	}

	if (options.finishedText == undefined || typeof(options.finishedText) != 'string') {
		finishedText = null;
	}

	container.className = 'ts-progressbar-container';

	stretch = document.createElement('div');
	stretch.className = 'ts-progressbar-stretch';
	stretch.setAttribute('style', 'position:relative;width:100%;height:100%;');
	container.appendChild(stretch);

	progressBar = document.createElement('div');
	progressBar.className = 'ts-progressbar-progress';
	progressBar.setAttribute('style', 'color: ' + color + '; background-color: ' + background + ';' + 'width: 0%;');

	label = document.createElement('h3');
	label.className = 'ts-progressbar-label';

	progressBar.appendChild(label);
	stretch.appendChild(progressBar); 

	var self = {
		update: function(percentage) {
			if (typeof(percentage) != 'number') {
				try {
					percentage = parseFloat(percentage);
				}
				catch (err) {
					throw 'Unable to parse a percentage value from parameter.';
				}
			}
			var text;
			if (percentage > 100) {
				percentage = 100;
				if (finishedText != null) {
					text = finishedText;
				} else {
					text = percentage.toFixed(round) + '%';
				}
			}
			if (percentage == 0) {
				label.setAttribute('style', 'line-height: ' + container.clientHeight + 'px;' + 'display: none');

			} else {
				text = percentage.toFixed(round) + '%';
				label.setAttribute('style', 'line-height: ' + container.clientHeight + 'px;' + 'display: block');
			}

			progress = percentage;
			label.innerHTML = text;
			progressBar.setAttribute('style', 'color: ' + color + '; background-color: ' + background + ';' + 'width: ' + progress + '%;');
			return progressBar;
		}
	};

	return self;
}