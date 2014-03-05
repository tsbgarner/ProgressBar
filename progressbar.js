function ProgressBar(options) {
	var container,
		stretch,
		progressBar,
		label,
		height;

	var color;
	var round;
	var finishedText;
	var progress;

	if (options.container === undefined || options.container === null || options.container.tagName !== 'DIV') {
		throw 'Progress bar requires a div be specified as the container.';
	}
	container = options.container;

	(options.color === undefined || typeof(options.color) !== 'string') ?
	color = '#ffffff' : color = options.color;

	(options.background === undefined || typeof(options.background) !== 'string') ?
	background = '#333333' : background = options.background;

	(options.round === undefined || typeof(options.round) !== 'number') ?
	round = 0 : round = options.round;

	(options.finishedText === undefined || typeof(options.finishedText) !== 'string') ?
	finishedText = '100%' : finishedText = options.finishedText;

	(options.height === undefined || typeof(options.height) !== 'number') ? 
	height = 40 : height = options.height;

	container.className = 'pb-container';
	container.setAttribute('style', 'height:' + height + 'px');

	stretch = document.createElement('div');
	stretch.className = 'pb-stretch';
	stretch.setAttribute('style', 'position:relative;width:100%;height:100%;');
	container.appendChild(stretch);

	progressBar = document.createElement('div');
	progressBar.className = 'pb-progress';
	progressBar.setAttribute('style', 'color: ' + color + '; background-color: ' + background + ';' + 'width: 0%;');

	label = document.createElement('p');
	label.className = 'pb-label';

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
		},
		height: height,
		progress: progress
	};

	return self;
}