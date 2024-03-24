(function ($) {

    $(document).ready(function () {
        
        $('.mindmap').on('mouseover', '.node', function () {

            let $this = $(this);
            let pos = $this.offset();
            let top = pos.top + $('.node').height();
            let left = pos.left + $('.node').width();

            $('.tooltip .node_img').attr('src', $this.find('.node_img').attr('src'));
            $('.tooltip .description').text($this.find('.description').text());

            const isNotWhitespaceString = str => !/\S/.test(str);

            if (!isNotWhitespaceString($('.tooltip .description').text()) || !isNotWhitespaceString($('.tooltip .node_img').attr('src'))) {
                $('.tooltip').show();
            }

            if (left + $('.tooltip').outerWidth() > $(window).width()) {
                left = $(window).width() - $('.tooltip').outerWidth();
            }

            if (top + $('.tooltip').outerHeight() > $(window).height()) {
                top = $(window).height() - $('.tooltip').outerHeight();
            }

            $('.tooltip').css({
                top: top,
                left: left
            });

        });

        $('.mindmap').on('mouseout', '.node', function () {

            $('.tooltip').hide();
            $('.tooltip node_img').attr('src', '');
            $('.tooltip description').empty();
        });

        $('.delete_btn').click(function () {

            let node = $(this).data('node');
            let immediate = node.closest('.children_item');
            let parent = node.closest('.children');


            if (parent.children('.children_item').length === 1) {
                parent.remove();
            } else {
                immediate.remove();
            }

            $('.dropdown').hide();
        });

        $('.add_btn').click(function () {

            $('.dropdown').hide();

            let node = $(this).data('node');
            let immediate = node.closest('.children_item');
            let children = immediate.children('.children');

            let newChildrenItem = $('<li class="children_item"><div class="node"><div class="node_text">New Node</div><img src="" class="node_img"><div class="description"></div></div></li>');

            if (children.length === 0) {
                children = $('<ol class="children"></ol>');
                immediate.append(children);
            }

            children.append(newChildrenItem);
        });


        $('.edit_btn').click(function () {

            node = $(this).data('node');

            $('.editing_node').data('node', node);

            let pos = node.offset();

            $('.dropdown').hide();
            $('.editing_node').css({ 'top': pos.top, 'left': pos.left }).show();
        });

        $('.editing_node').submit(function (e) {

            e.preventDefault();

            let node = $(this).data('node');

            let nodeText = $('#node-text').val();
            let nodeDes = $('#describe').val();
            let file = $('#image')[0].files[0];

            if (nodeText !== '') {
                node.find('.node_text').text(nodeText);
            }

            if (nodeDes !== '') {
                node.find('.description').text(nodeDes);
            }

            if (file) {
                let img = new Image();
                img.onload = function () {
                    node.find('.node_img').attr('src', img.src);
                }
                img.src = URL.createObjectURL(file);
            }

            $('#node-text').val('');
            $('#image').val('');
            $('#describe').val('');

            $('.editing_node').hide();
        });

        $('.cancel-button').click(function () {
            $('.editing_node').hide();
            $('#node-text').val('');
            $('#image').val('');
            $('#describe').val('');
        });

        $('.clear').click(function(){
            let node = $(this).data('node');
            node.find('.node_img').attr('src', '');
            $('.editing_node').hide();
        });

        $('.mindmap').on('dblclick', '.node', function (event) {

            let pos = $(this).offset();

            $('.delete_btn').data('node', $(this));
            $('.add_btn').data('node', $(this));
            $('.edit_btn').data('node', $(this));
            $('.clear').data('node', $(this));

            $('.dropdown').css({ 'top': pos.top + $(this).height(), 'left': pos.left });
            $('.dropdown').slideToggle();
            $('.tooltip').hide();

            $(document).on('click', function (e) {
                if (!$(e.target).closest('.dropdown').length) {
                    $('.dropdown').hide();
                    $(this).off(e);
                }
            });
        });
    });
})(jQuery);
